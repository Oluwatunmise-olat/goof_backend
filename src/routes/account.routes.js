const router = require("express").Router();
const { checkSchema, check } = require("express-validator");

const controller = require("../controllers/account.controller.js");
const schemas = require("../schema/schemas");
const IsAuth = require("../middleware/auth.middleware");

const BodyFieldErrorMiddleware = require("../middleware/bodyFieldErrors.middleware");


router
  .route("/verify/phone")
  .post(
    checkSchema(schemas.phoneverificationSchema),
    BodyFieldErrorMiddleware.getFieldErrors,
    controller.phoneverificationHandler
  )
  .put(
    checkSchema(schemas.updatephoneVerificationSchema),
    BodyFieldErrorMiddleware.getFieldErrors,
    controller.phoneverificationHandler
  );
router.post(
  "/signup/email",
  checkSchema(schemas.signupSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.signupHandler
);
router.post(
  "/login/email",
  checkSchema(schemas.loginSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.loginHandler
);

router.post(
  "/password/forgot",
  checkSchema(schemas.forgotPasswordSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.forgotPasswordHandler
);

router.post(
  "/password/verify-token",
  checkSchema(schemas.verifyPinSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.verifyResetPinHandler
);

router.post(
  "/password/reset",
  checkSchema(schemas.resetPasswordSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.resetPasswordHandler
);

router.patch(
  "/password/change",
  [IsAuth, checkSchema(schemas.changePasswordSchema)],
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.changePasswordHandler
);

router.get(
  "/logout",
  IsAuth,
  controller.logoutHandler
);

router.get("/signup/google/constent", controller.withGoogle);

module.exports = router;
