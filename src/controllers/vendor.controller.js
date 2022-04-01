const services = require("../service/vendor.service");
const response = require("../utils/response");

exports.aboutVendorHandler = async (req, res, next) => {
  try {
    const resp = await services.aboutVendor(req);
    if (resp.error) {
      let code = resp.code == undefined ? "" : resp.code;
      return res
        .status(400)
        .json(response({ status: false, errorData: resp.errorData, code }));
    }

    return res.status(201).json(response({ status: true, msg: resp.msg }));
  } catch (error) {
    return next(error);
  }
};

exports.createStoreHandler = async (req, res, next) => {
  try {
    const resp = await services.createStore(req);
    if (resp.error) {
      let code = resp.code == undefined ? "" : resp.code;
      return res
        .status(400)
        .json(response({ status: false, errorData: resp.errorData, code }));
    }

    return res
      .status(201)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

exports.updateStoreHandler = async (req, res, next) => {
  try {
    const resp = await services.editStore(req);
    if (resp.error) {
      let code = resp.code == undefined ? "" : resp.code;
      return res
        .status(400)
        .json(response({ status: false, errorData: resp.errorData, code }));
    }

    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

exports.setStoreLocationHandler = async (req, res, next) => {
  try {
    const resp = await services.setStoreLocation(req);
    if (resp.error) {
      let statusCode = resp.statusCode == undefined ? 400 : resp.statusCode;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }

    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

exports.updateStoreLocationHandler = async (req, res, next) => {
  try {
    const resp = await services.editStoreLocation(req);
    if (resp.error) {
      let statusCode = resp.statusCode == undefined ? 400 : resp.statusCode;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }

    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
