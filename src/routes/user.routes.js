const router = require("express").Router();
const { checkSchema } = require("express-validator");

const controller = require("../controllers/user.controller");
const schemas = require("../schema/schemas");
const IsAuth = require("../middleware/auth.middleware");
const BodyFieldErrorMiddleware = require("../middleware/bodyFieldErrors.middleware");

router.get("/profile", IsAuth, controller.getUserProfileHandler);
router.post(
  "/location",
  [IsAuth, checkSchema(schemas.setLocationSchema)],
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.setLocationHandler
);

router.patch(
  "/profile/edit",
  IsAuth,
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.updateUserProfileHandler
);

module.exports = router;
