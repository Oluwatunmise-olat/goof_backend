const models = require("../models/index");
const logger = require("../../logger/log");
const { errMsg } = require("../utils/error");
const { phoneRegex } = require("../utils/patterns");

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

exports.createStoreSchema = {
  store_name: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("store_name")
  },
  store_phone_no: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("store_phone_no"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && (value.length < 14 || value.length > 14)) {
          return Promise.reject("Phone number should have a length of 14");
        }
        if (!phoneRegex.test(value))
          return Promise.reject("Invalid Phone Number Pattern");

        return Promise.resolve();
      }
    }
  },
  store_cover: {
    optional: { nullable: true }
  },
  store_avatar: {
    optional: { nullable: true }
  }
};

exports.editStoreSchema = {
  store_name: {
    optional: { nullable: true }
  },
  store_avatar: {
    optional: { nullable: true }
  },
  store_cover: {
    optional: { nullable: true }
  },
  store_phone_no: {
    optional: { nullable: true }
  }
};
