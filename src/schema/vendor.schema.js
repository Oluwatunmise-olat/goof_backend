const models = require("../models/index");
const logger = require("../../logger/log");
const { errMsg } = require("../utils/error");

exports.aboutVendorSchema = {
  docs: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("docs")
  },
  about: {
    in: ["body"],
    exists: true,
    trim: true,
    errorMessage: errMsg("about")
  }
};
