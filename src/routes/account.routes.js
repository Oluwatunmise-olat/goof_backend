const router = require("express").Router();
const { checkSchema, check } = require("express-validator");

const controller = require("../controllers/account.controller.js");
const {
  phoneVerificationSchema,
  updatePhoneVerificationSchema,
  signUpSchema
} = require("../schema/schemas");

router
  .route("/verify/phone")
  .post(
    checkSchema(phoneVerificationSchema),
    controller.phoneVerificationHandler
  )
  .put(
    checkSchema(updatePhoneVerificationSchema),
    controller.phoneVerificationHandler
  );
router.get("/signup", checkSchema(signUpSchema), controller.signupHandler);

module.exports = router;
