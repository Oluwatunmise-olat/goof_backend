const {
  verifyPhone,
  updateVerifyPhone,
  signup
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
    return next(error);
  }
};

exports.signupHandler = async (req, res, next) => {
  // send welcome email
  try {
    const resp = await signup(req);
    if (resp.error)
      return res
        .status(400)
        .json(response((status = false), (errorData = resp.errorData)));

    logger.info(`User created: [${resp.data.id}]`);
    return res
      .status(201)
      .json(response((status = true), (msg = resp.msg), (data = resp.data)));
  } catch (error) {
    return next(error);
  }
};
