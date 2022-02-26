const router = require("express").Router();
const { checkSchema } = require("express-validator");

const controller = require("../controllers/account.controller.js");
const { phoneVerificationSchema } = require("../schema/schemas");

router.post(
  "/verify/phone",
  checkSchema(phoneVerificationSchema),
  controller.phoneVerificationHandler
);
// router.put("/verify/phone", controller.updatePhoneVerificationHandler);
router.get("/signup", controller.signupHandler);

module.exports = router;
