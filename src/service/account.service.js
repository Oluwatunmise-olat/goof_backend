const { validationResult } = require("express-validator");

const { extractMessage } = require("../utils/error");
const { sendCode, verifyCode } = require("../utils/twillo");
const { phone_verification, User } = require("../models/index");
const logger = require("../../logger/log");

exports.verifyPhone = async (req) => {
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
    let exists = await phone_verification.findOne({ where: { phone_number } });
    if (!exists) {
      await phone_verification.create({
        phone_number
      });
    }
    resp.msg = "Code sent";
    return resp;
  }
};

exports.updateVerifyPhone = async (req) => {
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
    await phone_verification.update(
      { verified: true },
      {
        where: { phone_number }
      }
    );
    resp.msg = "phone number verified";
    return resp;
  }
};

exports.signup = async (req) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const {
    firstname,
    lastname,
    role_id,
    email,
    password,
    phone_number,
    avatar
  } = req.body;

  // encrpty password
  const password_hash = await User.makePassword(password);
  try {
    let user = await User.create({
      firstname,
      lastname,
      email,
      password_hash,
      phone_number,
      role_id,
      avatar: avatar == null || undefined ? "" : avatar
    });
    //TODO:: - Exclude password hash
    // - Include role data!
    return { error: false, data: user, msg: "User created" };
  } catch (error) {
    logger.error(`
      Error saving user in db(users) [service/account.service.js]
    `);
  }
};
