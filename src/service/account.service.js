const { validationResult } = require("express-validator");

const { extractMessage } = require("../utils/error");
const { sendCode } = require("../utils/twillo");
const { phone_verification } = require("../models/index");

exports.verifyPhone = async (req) => {
  const { errors } = validationResult(req);
  const { phone_number } = req.body;
  const resp = { error: false };

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    console.log(errorsArr);
    return { error: true, errorData: errorsArr };
  }

  // send verification code and save in db
  let [status, data] = await sendCode(phone_number);
  if (!status) {
    // log error
  } else {
    await phone_verification.create({
      phone_number
    });
    resp.msg = "Code sent";
    return resp;
  }
};
