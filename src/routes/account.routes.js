const router = require("express").Router();
const { checkSchema, check } = require("express-validator");

const controller = require("../controllers/account.controller.js");
const {
  phoneverificationSchema,
  updatephoneVerificationSchema,
  signupSchema
} = require("../schema/schemas");

router
  .route("/verify/phone")
  .post(
    checkSchema(phoneverificationSchema),
    controller.phoneverificationHandler
  )
  .put(
    checkSchema(updatephoneVerificationSchema),
    controller.phoneverificationHandler
  );
router.post(
  "/signup/email",
  checkSchema(signupSchema),
  controller.signupHandler
);
router.get("/signup/google/constent", controller.withGoogle);

module.exports = router;
