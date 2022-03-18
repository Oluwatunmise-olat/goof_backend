const crypto = require("crypto");

module.exports = () => {
  return crypto.randomBytes(40).toString("hex");
};

exports.reset_code = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
