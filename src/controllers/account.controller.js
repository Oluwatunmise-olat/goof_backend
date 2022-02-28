
const {
  verifyPhone,
  updateVerifyPhone
} = require("../service/account.service");
const response = require("../utils/response");
const logger = require("../../logger/log");

exports.phoneVerificationHandler = async (req, res, next) => {
  let result;

  try {
    result =
      req.method == "POST"
        ? await verifyPhone(req)
        : await updateVerifyPhone(req);

    if (result.error) {
      let code = result.code !== undefined ? result.code : "";
      return res
        .status(400)
        .json(response({ status: false, errorData: result.errorData, code }));
    }
    return res.status(200).json(response({ status: true, msg: result.msg }));
  } catch (error) {
    logger.error(
      `phone verification handler error [controllers/account.controllers] ${error.message}: ${error}`
    );
  }
};

exports.signupHandler = async (req, res, next) => {
  // check constraint for email and phone number
  // perform signup
  // send welcome email
};