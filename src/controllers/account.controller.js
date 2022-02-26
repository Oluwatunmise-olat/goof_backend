let { User } = require("../models/index");

const {
  verifyPhone,
  updateVerifyPhone
} = require("../service/account.service");
const response = require("../utils/response");

exports.phoneVerificationHandler = async (req, res, next) => {
  let result;

  try {
    result =
      req.method == "POST"
        ? await verifyPhone(req)
        : await updateVerifyPhone(req);

    if (result.error) {
      return res
        .status(400)
        .json(response({ status: false, errorData: result.errorData }));
    }
    return res.status(200).json(response({ status: true, msg: result.msg }));
  } catch (error) {
    // log error
  }
};

exports.signupHandler = async (req, res, next) => {
  // validate user input
  // validate email
  // validate phone_number
  // verify phone number
  // verify role_id
  // check constraint for email and phone number
  // perform signup
  // send email
};
