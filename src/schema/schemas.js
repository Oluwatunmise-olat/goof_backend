const {
  User,
  phoneverification: phoneVerification
} = require("../models/index");
const { phoneRegex } = require("../utils/patterns");

exports.signupSchema = {
  firstname: {
    in: ["body"],
    isEmpty: false,
    trim: true,
    errorMessage: "firstname required"
  },
  lastname: {
    in: ["body"],
    trim: true,
    errorMessage: "lastname required",
    isEmpty: false
  },
  email: {
    in: ["body"],
    isEmpty: false,
    trim: true,
    isEmail: true,
    normalizeEmail: true,
    custom: {
      options: (value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email Taken");
          }
        });
      }
    }
  },
  password: {
    in: ["body"],
    trim: true,
    isEmpty: false,
    isLength: {
      errorMessage: "Password Too Short",
      options: { min: 5 }
    }
  },
  phone_number: {
    in: ["body"],
    trim: true,
    notEmpty: true,
    errorMessage: "Phone  number cannot be empty"
  }
};

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
        console.log(User, phoneVerification);
        if (!valid) {
          errorMessage = "Invalid Phone Number Pattern";
          return Promise.reject("Invalid Phone Number Pattern");
        }
        // verify if number exists in verification table
        return phoneVerification
          .findOne({ where: { phone_number: value } })
          .then((number) => {
            if (number && number.verified == true) {
              return Promise.reject("Number exists");
            }
            return true;
          })
          .catch(); // log error
      }
    }
  }
};
