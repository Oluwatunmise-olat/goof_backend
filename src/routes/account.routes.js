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
router.post(
  "/signup/email",
  checkSchema(signUpSchema),
  controller.signupHandler
);
router.get("/signup/google/constent", controller.withGoogle);
// router.post("/signup/google");

module.exports = router;
