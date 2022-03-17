const { validationResult } = require("express-validator");

const { extractMessage } = require("../utils/error");
const { sendCode, verifyCode } = require("../utils/twillo");
const { getGoogleAuthUrl, getTokens } = require("../utils/oauth");
const models = require("../models/index");
const logger = require("../../logger/log");
const { genAccessToken } = require("../service/jwt.service");

exports.sendphoneCode = async (req) => {
  const { errors } = validationResult(req);
  const { phone_number } = req.body;
  const resp = { error: false };

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  // send verification code and save in db
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
  const { errors } = validationResult(req);
  const { phone_number, code } = req.body;
  const resp = { error: false };

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

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
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  let { firstname, lastname, role_id, email, password, phone_number, avatar } =
    req.body;

  phone_number = phone_number.split("+")[1];
  // encrypt password
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
          role_id,
          avatar: avatar == null || undefined ? "" : avatar
        },
        { transaction: t }
      );

      // create user wallet
      await user.afterCreate(
        models.Wallet,
        { user_id: user.dataValues.id },
        { transaction: t }
      );
      // create cart
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
  // verify email and password
  // generate jwt
  // return user data
  const { errors } = validationResult(req);
  const resp = { error: false };

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { email, password } = req.body;

  // check user exists
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

    // generate jwt
    const accessToken = await genAccessToken({
      user_id: userExists.dataValues.id,
      role_id: userRole.dataValues.id
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
  // email should exist in db
  // create a token that expires
  const { errors } = validationResult(req);
  const resp = { error: false };

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { email, type } = req.body;

  try {
    const exists = await models.User.findOne({ where: { email } });
    if (!exists)
      return {
        ...resp,
        msg: "A reset instruction will be sent to this email."
      };

    // generate token
    const token = "djdkkd"
    // check if a token has been generated for email and hasn't been used of expired
    // else generate token for user
    // send token
  } catch (error) {}
};

// once token is used once, delete it from db

exports.resetPassword = (req) => {
  const { token, password } = req.body;
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
