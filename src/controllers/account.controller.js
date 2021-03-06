const services = require("../service/account.service");
const response = require("../utils/response");
const logger = require("../../logger/log");

exports.phoneverificationHandler = async (req, res, next) => {
  let result;

  try {
    result =
      req.method == "POST"
        ? await services.sendphoneCode(req)
        : await services.verifyphoneCode(req);

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
    const resp = await services.signupwithEmail(req);
    if (resp.error)
      return res
        .status(400)
        .json(response({ status: false, errorData: resp.errorData }));

    logger.info(`User created: [${resp.data.id}]`);
    return res
      .status(201)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

exports.loginHandler = async (req, res, next) => {
  try {
    const resp = await services.loginwithEmail(req);
    if (resp.error)
      return res.status(401).json(
        response({
          status: false,
          errorData: resp.errorData,
          msg: "Invalid Credentials"
        })
      );

    logger.info(`User Log In: [${resp.data.id}]`);
    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

exports.forgotPasswordHandler = async (req, res, next) => {
  try {
    const resp = await services.forgotPassword(req);
    if (resp.error)
      return res.status(400).json(
        response({
          status: false,
          errorData: resp.errorData
        })
      );

    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

exports.verifyResetPinHandler = async (req, res, next) => {
  try {
    const resp = await services.verifyPinCode(req);
    if (resp.error)
      return res.status(400).json(
        response({
          status: false,
          errorData: resp.errorData
        })
      );
    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

exports.resetPasswordHandler = async (req, res, next) => {
  try {
    const resp = await services.resetPassword(req);
    if (resp.error)
      return res.status(400).json(
        response({
          status: false,
          errorData: resp.errorData
        })
      );
    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

exports.changePasswordHandler = async (req, res, next) => {
  try {
    const resp = await services.changePassword(req);
    if (resp.error)
      return res.status(400).json(
        response({
          status: false,
          errorData: resp.errorData
        })
      );
    return res.status(200).json(response({ status: true, msg: resp.msg }));
  } catch (error) {
    return next(error);
  }
};

exports.logoutHandler = async (req, res, next) => {
  try {
    const resp = await services.logout(req);
    return res.status(200).json(response({ status: true, msg: resp.msg }));
  } catch (error) {
    return next(error);
  }
};

exports.withGoogle = (req, res) => {
  return res.status(200).json(
    response({
      status: true,
      msg: "Google Oauth Constent Screen",
      data: { uri: services.googleConsentScreen() }
    })
  );
};

exports.googleHook = async (req, res) => {
  // gets access token and id token
  const { code } = req.query;
  let data = await services.googleUser(code);
};
