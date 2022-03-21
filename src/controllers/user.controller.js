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
