const { User, phone_verification, Role } = require("../models/index");
const { phoneRegex } = require("../utils/patterns");
const logger = require("../../logger/log");
const { errMsg } = require("../utils/error");

exports.phoneVerificationSchema = {
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

exports.updatePhoneVerificationSchema = {
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

exports.signUpSchema = {
  firstname: {
    in: ["body"],
    isEmpty: false,
    trim: true,
    errorMessage: errMsg("firstname")
  },
  lastname: {
    in: ["body"],
    isEmpty: false,
    trim: true,
    errorMessage: errMsg("lastname")
  },
  email: {
    in: ["body"],
    isEmpty: false,
    trim: true,
    errorMessage: errMsg("email"),
    normalizeEmail: true,
    custom: {
      options: (value) => {
        return User.findOne({ where: { email: value } })
          .then((user) => {
            if (user) return Promise.reject("User Already Exists");
            return Promise.resolve();
          })
          .catch((err) => {
            logger.error(
              `Error fetching data from db(users) - user signup validation schema ${err}`
            );
          });
      }
    }
  },
  phone_number: {
    in: ["body"],
    isEmpty: false,
    errorMessage: errMsg("phone_number"),
    trim: true,
    custom: {
      options: (value) => {
        // check valid pattern
        const valid = phoneRegex.test(value);
        if (!valid) return Promise.reject("Invalid Phone Number Pattern");
        // check its verified
        return phone_verification
          .findOne({ phone_number: value })
          .then((result) => {
            if (!result || !result.verified)
              return Promise.reject("Phone number not verified");
            // check constraint
            return User.findOne({ where: { phone_number: value } }).then(
              (user) => {
                if (user) return Promise.reject("Phone number taken");
                return Promise.resolve();
              }
            );
          })
          .catch((err) => {
            logger.error(
              `
              Error fetching data from db(phone verification) - user signup validation schema ${err}

              `
            );
          });
      }
    }
  },
  password: {
    in: ["body"],
    isEmpty: false,
    errorMessage: errMsg("password"),
    trim: true,
    isLength: {
      options: { min: 5 },
      errorMessage: "Password too short"
    },
    custom: {
      options: (value, { req }) => {
        let { password_confirm } = req.body;
        if (password_confirm && password_confirm !== value)
          return Promise.reject("Password doesn't match");
      }
    }
  },
  password_confirm: {
    in: ["body"],
    isEmpty: false,
    errorMessage: errMsg("password_confirm"),
    trim: true,
    isLength: {
      options: { min: 5 },
      errorMessage: "Password confirm too short"
    }
  },
  avatar: {
    // optional
    optional: {
      options: { nullable: true }
    }
  },
  role_id: {
    in: ["body"],
    isEmpty: false,
    errorMessage: errMsg("role_id"),
    custom: {
      options: (value) => {
        // verify it's an int
        if (!typeof value == "number")
          return Promise.reject("Invalid role_id type");
        // verify role_id exists
        return Role.findByPk(value)
          .then((role) => {
            if (!role) return Promise.reject("Invalid role_id");
            return Promise.resolve();
          })
          .catch((err) => {
            logger.error(`
            Error fetching data from db(roles) - user signup validation schema ${err}

            `);
          });
      }
    }
  }
};
