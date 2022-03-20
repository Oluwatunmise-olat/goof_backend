const { User, phone_verification, Role } = require("../models/index");
const { phoneRegex } = require("../utils/patterns");
const logger = require("../../logger/log");
const { errMsg } = require("../utils/error");

exports.phoneverificationSchema = {
  phone_number: {
    in: ["body"],
    trim: true,
    isEmpty: false,
    custom: {
      options: (value, { req }) => {
        if (!value) return Promise.reject("Phone number field is required");
        let valid = phoneRegex.test(value);
        // verify regex pattern (+234XXXXXXXXXX)
        if (!valid) return Promise.reject("Invalid Phone Number Pattern");
        // verify if number exists in verification table
        return phone_verification
          .findOne({ where: { phone_number: value } })
          .then((number) => {
            if (number && number.verified) return Promise.reject("verified");
            return true;
          })
          .catch((err) => {
            logger.error(
              `Error fetching data from db(phone verification) - phone validation schema ${err}`
            );
          });
      }
    }
  }
};

exports.updatephoneVerificationSchema = {
  code: {
    in: ["body"],
    trim: true,
    isEmpty: false,
    errorMessage: errMsg("code")
  },
  phone_number: {
    in: ["body"],
    trim: true,
    isEmpty: false,
    custom: {
      options: (value, { req }) => {
        if (!value) return Promise.reject("Phone number field is required");
        let valid = phoneRegex.test(value);
        if (!valid) {
          return Promise.reject("Invalid Phone Number Pattern");
        }
        return phone_verification
          .findOne({ where: { phone_number: value } })
          .then((number) => {
            if (!number) return Promise.reject("Not Found");
            if (number.verified) return Promise.reject("verified");
          })
          .catch((err) => {
            logger.error(
              `Error fetching data from db(phone verification) - update phone validation schema ${err}`
            );
          });
      }
    }
  }
};

exports.signupSchema = {
  firstname: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("firstname"),
    trim: true
  },
  lastname: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("firstname"),
    trim: true
  },
  password_confirm: {
    in: ["body"],
    exists: true,
    custom: {
      options: (value) => {
        if (!value) return Promise.reject(errMsg("password_confirm"));
        if (value.length < 5)
          return Promise.reject("Password confirm too short");
        return Promise.resolve();
      }
    }
  },
  password: {
    in: ["body"],
    exists: true,
    custom: {
      options: (value, { req }) => {
        let { password_confirm } = req.body;
        if (!value) return Promise.reject(errMsg("password_confirm"));
        if (value.length < 5)
          return Promise.reject("Password confirm too short");
        if (!value == password_confirm)
          return Promise.reject("Password Mismatch");
        return Promise.resolve();
      }
    }
  },
  avatar: {
    optional: { nullable: true }
  },
  role_id: {
    in: ["body"],
    exists: true,
    custom: {
      options: async (value) => {
        if (typeof value != "number")
          return Promise.reject("Invalid role_id datatype");
        try {
          const role = await Role.findByPk(value);
          if (!role) return Promise.reject("Invalid role_id");
          return Promise.resolve();
        } catch (error) {
          logger.error(`
            Error fetching data from db(roles) - [schema/schmas.js] ${error}
            `);
        }
      }
    }
  },
  phone_number: {
    in: ["body"],
    exists: true,
    custom: {
      options: async (value) => {
        if (!value) return Promise.reject(errMsg("phone_number"));
        if (!phoneRegex.test(value))
          return Promise.reject("Invalid Phone Number Pattern");
        try {
          const exists = await phone_verification.findOne({
            where: { phone_number: value }
          });
          const user = await User.findOne({ where: { phone_number: value } });
          if (!exists.dataValues.id || !exists.dataValues.verified)
            return Promise.reject("Phone number not verified");
          if (user) return Promise.reject("Phone number taken");
          return Promise.resolve();
        } catch (error) {
          logger.error(`
          Error fetching data from db(phone verification) - [schema/schemas.js] ${error}
          `);
        }
      }
    }
  },
  email: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("email"),
    normalizeEmail: true,
    custom: {
      options: async (value) => {
        if (!value) return Promise.reject(errMsg("email"));
        try {
          const exists = await User.findOne({ where: { email: value } });
          if (exists.dataValues.id) return Promise.reject("Email Taken");
          return Promise.resolve();
        } catch (error) {
          logger.error(`
            Error fetching data from db(users) - [schema/schemas.js] ${error}
          `);
        }
      }
    }
  }
};

exports.loginSchema = {
  email: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("email")
  },
  password: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("password")
  }
};

exports.forgotPasswordSchema = {
  email: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("email")
  },
  type: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("type"),
    custom: {
      options: (value) => {
        if (!value in ["account", "wallet"])
          return Promise.reject("invalid type field");
        return Promise.resolve();
      }
    }
  },
  resend: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("resend"),
    custom: {
      options: (value) => {
        if (!value in [true, false])
          return Promise.reject("Invalid resend type");
        return Promise.resolve();
      }
    }
  }
};

exports.verifyPinSchema = {
  email: {
    in: ["body"],
    exists: true,
    trim: true,
    normalizeEmail: true,
    errorMessage: errMsg("email")
  },
  token: {
    in: ["body"],
    exists: true,
    trim: true,
    errorMessage: errMsg("token"),
    custom: {
      options: (value) => {
        if (!value.length == 6) return Promise.reject("Invalid token");
        return Promise.resolve();
      }
    }
  },
  type: {
    in: ["body"],
    exists: true,
    trim: true,
    errorMessage: errMsg("type"),
    custom: {
      options: (value) => {
        if (!value in ["account", "wallet"])
          return Promise.reject("invalid type field");
        return Promise.resolve();
      }
    }
  }
};

exports.resetPasswordSchema = {
  email: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("email")
  },
  password_confirm: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("password_confirm")
  },
  password: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("token"),
    custom: {
      options: (value, { req }) => {
        if (!value == req.body.password_confirm)
          return Promise.reject("Password doesn't match");
        return Promise.resolve();
      }
    }
  }
};
