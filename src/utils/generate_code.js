const crypto = require("crypto");

module.exports = () => {
  return crypto.randomBytes(40).toString("hex");
};

exports.reset_code = () => {
  return crypto.randomBytes(32).toString("base64").split("=")[0];
};
