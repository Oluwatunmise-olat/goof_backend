const router = require("express").Router();
const { checkSchema, check } = require("express-validator");

const controller = require("../controllers/account.controller.js");
const schemas = require("../schema/schemas");

router
  .route("/verify/phone")
  .post(
    checkSchema(schemas.phoneverificationSchema),
    controller.phoneverificationHandler
  )
  .put(
    checkSchema(schemas.updatephoneVerificationSchema),
    controller.phoneverificationHandler
  );
router.post(
  "/signup/email",
  checkSchema(schemas.signupSchema),
  controller.signupHandler
);
router.get("/signup/google/constent", controller.withGoogle);

router.post(
  "/login/email",
  checkSchema(schemas.loginSchema),
  controller.loginHandler
);

module.exports = router;
