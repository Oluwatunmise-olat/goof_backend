let { User } = require("../models/index");

const { verifyPhone } = require("../service/account.service");

exports.phoneVerificationHandler = (req, res, next) => {
  let valid;

  try {
    valid = verifyPhone(req);
  } catch (error) {
    // handle error
  }
  return res.sendStatus(200)
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
