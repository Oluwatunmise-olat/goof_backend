const response = require("../utils/response");

exports.IsVendorOrAdmin = (req, res, next) => {
  const roles = ["ADMIN", "VENDOR"];
  if (!roles.includes(req.roleName)) {
    return res
      .status(403)
      .json(
        response({ status: false, errorData: [{ msg: "Permission denied" }] })
      );
  }
  return next();
};
