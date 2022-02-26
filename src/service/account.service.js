const { validationResult } = require("express-validator");

const { extractMessage } = require("../utils/error");

exports.verifyPhone = async (req) => {
  const { errors } = validationResult(req);
  const resp = { error: false };

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    console.log(errorsArr)
    return { error: true, errorData: errorsArr };
  }

  // send verification code and save in db
  let code = await sendCode(req.body.phone_number);
  console.log(code)
  return errors;
};

exports.phoneRegex = (str) => {};
