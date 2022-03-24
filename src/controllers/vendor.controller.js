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
