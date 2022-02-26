const router = require("express").Router();
const { checkSchema, check } = require("express-validator");

const controller = require("../controllers/account.controller.js");
const {
  phoneVerificationSchema,
  updatePhoneVerificationSchema
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
router.get("/signup", controller.signupHandler);

module.exports = router;

// from freelancer side
/**
 * 1. payment security
 * 2. brings accountability and structure, transparency
 * 3. multisignature incase a freelaner doesnt do a work and says it is done
 */
