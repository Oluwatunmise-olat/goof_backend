const userService = require("../service/user.service");
const response = require("../utils/response");

exports.getUserProfileHandler = async (req, res, next) => {
  try {
    const resp = await userService.getUserProfile(req);
    return res.status(200).json(response({ status: true, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

exports.setLocationHandler = async (req, res, next) => {
  try {
    const resp = await userService.setLocation(req);
    if (resp.error) {
      let code = resp.code !== undefined ? resp.code : "";
      return res
        .status(400)
        .json(response({ status: false, errorData: resp.errorData, code }));
    }
    return res
      .status(201)
      .json(response({ status: true, data: resp.data, msg: resp.msg }));
  } catch (error) {
    return next(error);
  }
};
