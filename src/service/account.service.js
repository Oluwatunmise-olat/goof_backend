const { sendCode, verifyCode } = require("../utils/twillo");
const { getGoogleAuthUrl, getTokens } = require("../utils/oauth");
const { reset_code } = require("../utils/generate_code");
const models = require("../models/index");
const logger = require("../../logger/log");
const mailer = require("../utils/queue/mail.queue");
const { genAccessToken } = require("./jwt.service");
const { blacklistToken } = require("./jwt.service");
const { extractAuth: extractAuthToken } = require("../utils/headers");
const moment = require("moment");

exports.sendphoneCode = async (req) => {
  const { phone_number } = req.body;
  const resp = { error: false };

  let [status, data] = await sendCode(phone_number);
  if (!status) {
    logger.error(`Twilio send verification error: ${data}`);
  } else {
    let exists = await models.phone_verification.findOne({
      where: { phone_number }
    });
    if (!exists) {
      await models.phone_verification.create({
        phone_number
      });
    }
    resp.msg = "Code sent";
    return resp;
  }
};

exports.verifyphoneCode = async (req) => {
  const { phone_number, code } = req.body;
  const resp = { error: false };

  let [status, data] = await verifyCode(phone_number, code);
  if (!status) {
    resp.errorData = [{ msg: "Code expired" }];
    resp.error = true;
    resp.code = 101;
    return resp;
  }
  if (data.status == "approved") {
    await models.phone_verification.update(
      { verified: true },
      {
        where: { phone_number }
      }
    );
    resp.msg = "phone number verified";
    return resp;
  }
};

exports.signupwithEmail = async (req) => {
  let { firstname, lastname, role_id, email, password, phone_number, avatar } =
    req.body;

  phone_number = phone_number.split("+")[1];

  const password_hash = await models.User.makePassword(password);
  try {
    return await models.sequelize.transaction(async (t) => {
      let user = await models.User.create(
        {
          firstname,
          lastname,
          email,
          password: password_hash,
          phone_number,
          phone_verified: true,
          role_id,
          avatar: avatar == null || undefined ? "" : avatar
        },
        { transaction: t }
      );

      await user.afterCreate(
        models.Wallet,
        { user_id: user.dataValues.id },
        { transaction: t }
      );
      await user.afterCreate(
        models.Cart,
        { user_id: user.dataValues.id },
        { transaction: t }
      );

      let roleInfo = await models.Role.findOne({
        where: { id: user.dataValues.role_id }
      });

      const { dataValues } = user;
      delete dataValues.password;
      delete dataValues.role_id;

      return {
        error: false,
        data: { ...dataValues, role_data: { ...roleInfo.dataValues } },
        msg: "User created"
      };
    });
  } catch (error) {
    logger.error(`
      Error saving user in db(users) [service/account.service.js]: ${error}
    `);
  }
};

exports.loginwithEmail = async (req) => {
  const resp = { error: false };

  const { email, password } = req.body;

  try {
    const userExists = await models.User.findOne({ where: { email } });

    if (!userExists)
      return { ...resp, error: true, errorData: [{ msg: "Unauthenticated" }] };

    const passwordValid = await userExists.checkPassword(
      userExists.dataValues,
      password
    );

    if (!passwordValid)
      return { ...resp, error: true, errorData: [{ msg: "Unauthenticated" }] };

    const userRole = await models.Role.findOne({
      where: { id: userExists.dataValues.role_id }
    });

    const accessToken = await genAccessToken({
      user_id: userExists.dataValues.id,
      role_id: userRole.dataValues.id,
      role_name: userRole.dataValues.name
    });

    delete userExists.dataValues.password;
    delete userExists.dataValues.role_id;

    return {
      ...resp,
      data: {
        ...userExists.dataValues,
        role_data: { ...userRole.dataValues },
        access_token: accessToken
      }
    };
  } catch (error) {
    logger.error(`
      Error fetching logging user [service/account.service.js]: ${error}
    `);
  }
};

exports.forgotPassword = async (req) => {
  const resp = { error: false };

  const { email, type, resend } = req.body;

  try {
    const exists = await models.User.findOne({ where: { email } });
    if (!exists)
      return {
        ...resp,
        msg: "A six digit pin has been sent to this email"
      };

    const sentToken = await models.Reset_Token.findOne({
      where: { email, type }
    });

    if (sentToken && !resend)
      return {
        ...resp,
        msg: "A six digit pin has been sent to this email"
      };

    if (sentToken && resend) {
      await sentToken.destroy();
    }

    const token = reset_code();

    await models.Reset_Token.create({
      type,
      email,
      token
    });

    const subject =
      type == "account" ? "Goof Account Reset Pin" : "Goof Wallet reset Pin";

    await mailer.resetMail({
      subject,
      to: email,
      token
    });

    return { ...resp, msg: "A six digit pin has been sent to this email" };
  } catch (error) {
    // log error
    console.log(error.message);
  }
};

exports.verifyPinCode = async (req) => {
  const resp = { error: false };

  const { email, token, type } = req.body;
  const tokenResetInst = await models.Reset_Token.findOne({
    where: { email, type }
  });

  if (!tokenResetInst)
    return { ...resp, error: true, errorData: [{ msg: "Invalid" }] };

  if (!tokenResetInst.token == token)
    return { ...resp, error: true, errorData: [{ msg: "Invalid Token" }] };

  if (tokenResetInst.expires_in < moment().format("hh:mm:ss")) {
    return { ...resp, error: true, errorData: [{ msg: "Token Expired" }] };
  }

  await tokenResetInst.destroy();
  return { ...resp, msg: "success" };
};

exports.resetPassword = async (req) => {
  const resp = { error: false };

  const { password, email } = req.body;

  try {
    const user = await models.User.findOne({ where: { email } });

    if (!user)
      return { ...resp, error: true, errorData: [{ msg: "Invalid Email" }] };

    const passwordHash = await models.User.makePassword(password);

    user.password = passwordHash;
    await user.save();

    return { ...resp, msg: "Password reset successfull" };
  } catch (error) {
    // log error
    console.log(error.message);
  }
};

exports.changePassword = async (req) => {
  const resp = { error: false };

  const { previous_password, new_password } = req.body;

  try {
    const user = await models.User.findOne({ where: { id: req.userID } });
    const isValid = await user.checkPassword(user, previous_password);
    if (!isValid)
      return {
        ...resp,
        error: true,
        errorData: [{ msg: "Invalid Password Credential" }]
      };
    user.password = await models.User.makePassword(new_password);
    await user.save();

    const [_, authToken] = extractAuthToken(req.headers);
    await blacklistToken(authToken[1]);

    return { ...resp, msg: "Password update successfull" };
  } catch (error) {}
};

exports.logout = async (req) => {
  const resp = { error: false };

  const [_, authToken] = extractAuthToken(req.headers);

  await blacklistToken(authToken[1]);
  return { ...resp, msg: "Successfully Logged out" };
};

exports.sendEmailCode = async (email) => {
  // create email verification with related user
  // before sending check:
  // - if email exists and verified is false and it hasn't expired, resend code
  // - if email exits and it has expired, resend new code
  // - if email doesnt exist send code
  // - all conditions must be associated with logged in user
  // send code using nodemailer
};

exports.verifyEmailCode = async (email, code) => {
  // verifies that users email_verified field is FALSE
  // then checks that the email exists in email_verification table
  // if it exists check expiry validity
  // if not valid send expired
  // else verify against code
  // if valid change users email_verified field to true
};

exports.googleConsentScreen = () => {
  return getGoogleAuthUrl();
};

exports.googleUser = async (code) => {
  /**
   * gets user info from google and creates user if id token not in db
   * else generate jwt for user
   */
  try {
    const data = await getTokens(code);
    return data;
  } catch (error) {
    // log error
  }
};
