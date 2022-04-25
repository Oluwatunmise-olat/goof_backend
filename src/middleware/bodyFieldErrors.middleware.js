const { validationResult } = require("express-validator");
const { extractMessage } = require("../utils/error");

class BodyFieldErrorMiddleware {
  getFieldErrors(request, response, next) {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
      const errorsArr = extractMessage(errors);
      return { error: true, errorData: errorsArr };
    }
    return next();
  }
}

module.exports = new BodyFieldErrorMiddleware();
