const {
  User,
  phone_verification: Phone_Verification,
  Role
} = require("../models/index");
const { phoneRegex } = require("../utils/patterns");
const logger = require("../../logger/log");
const { errMsg } = require("../utils/error");

exports.phoneverificationSchema = {
  phone_number: {
    in: ["body"],
    trim: true,
    exists: true,
    errorMessage: errMsg("phone_number"),
    custom: {
      options: async (value, { req }) => {
        let valid = phoneRegex.test(value);

        if (!valid) return Promise.reject("Invalid Phone Number Pattern");

        if (value.length < 14 || value.length > 14) {
          return Promise.reject("Phone number should have a length of 14");
        }

        try {
          const numberExists = await Phone_Verification.findOne({
            where: { phone_number: value }
          });

          if (!numberExists) return Promise.resolve();

          if (numberExists && numberExists.verified)
            return Promise.reject("Verified");
        } catch (error) {
          logger.error(
            `Error fetching data from db(phone verification) - phone validation schema ${err}`
          );
        }
      }
    }
  }
};

exports.updatephoneVerificationSchema = {
  code: {
    in: ["body"],
    trim: true,
    exists: true,
    errorMessage: errMsg("code")
  },
  phone_number: {
    in: ["body"],
    trim: true,
    exists: true,
    errorMessage: errMsg("phone_number"),
    custom: {
      options: (value, { req }) => {
        let valid = phoneRegex.test(value);
        if (!valid) {
          return Promise.reject("Invalid Phone Number Pattern");
        }
        if (value.length < 14 || value.length > 14) {
          return Promise.reject("Phone number should have a length of 14");
        }

        if (value) {
          return Phone_Verification.findOne({ where: { phone_number: value } })
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
    errorMessage: errMsg("lastname"),
    trim: true
  },
  password_confirm: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("password_confirm"),
    custom: {
      options: (value) => {
        if (value.length < 5)
          return Promise.reject("Password confirm too short");
        return Promise.resolve();
      }
    }
  },
  password: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("password"),
    bail: true,
    custom: {
      options: (value, { req }) => {
        let { password_confirm } = req.body;
        if (value.length < 5) return Promise.reject("Password too short");
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
    errorMessage: errMsg("role_id"),
    custom: {
      options: async (value) => {
        if (typeof value != "number")
          return Promise.reject("Invalid role_id datatype");
        try {
          if (value) {
            const role = await Role.findByPk(value);
            if (!role) return Promise.reject("Invalid role_id");
            return Promise.resolve();
          }
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
    errorMessage: errMsg("phone_number"),
    bail: true,
    custom: {
      options: async (value) => {
        if (value.length < 14 || value.length > 14) {
          return Promise.reject("Phone number should have a length of 14");
        }
        if (!phoneRegex.test(value))
          return Promise.reject("Invalid Phone Number Pattern");

        try {
          let userPhone = value.split("+")[1];
          const user = await User.findOne({
            where: { phone_number: userPhone }
          });

          const phoneVerified = await Phone_Verification.findOne({
            where: { phone_number: value }
          });

          if (phoneVerified && !phoneVerified.verified)
            return Promise.reject("Phone number not verified");

          if (user && user.dataValues.id)
            return Promise.reject("Phone number taken");

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
    isEmail: true,
    custom: {
      options: async (value) => {
        try {
          if (value) {
            const exists = await User.findOne({ where: { email: value } });
            if (exists) return Promise.reject("Email Taken");
            return Promise.resolve();
          }
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
    errorMessage: errMsg("email"),
    isEmail: true,
    normalizeEmail: true
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
    errorMessage: errMsg("email"),
    isEmail: true,
    normalizeEmail: true
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
    errorMessage: errMsg("email"),
    isEmail: true
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
    errorMessage: errMsg("email"),
    isEmail: true,
    normalizeEmail: true
  },
  password_confirm: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("password_confirm")
  },
  password: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("password"),
    custom: {
      options: (value, { req }) => {
        if (!value == req.body.password_confirm)
          return Promise.reject("Password doesn't match");
        return Promise.resolve();
      }
    }
  }
};

exports.changePasswordSchema = {
  previous_password: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("previous_password")
  },
  password_confirm: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("password_confirm")
  },
  new_password: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("new_password"),
    custom: {
      options: (value, { req }) => {
        if (!value == req.body.password_confirm)
          return Promise.reject("Password doesn't match");
        return Promise.resolve();
      }
    }
  }
};

exports.setLocationSchema = {
  longitude: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("longitude")
  },
  latitude: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("latitude")
  }
};
