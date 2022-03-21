const router = require("express").Router();
const { checkSchema } = require("express-validator");

const controller = require("../controllers/user.controller");
const schemas = require("../schema/schemas");
const IsAuth = require("../middleware/auth.middleware");

router.get("/profile", IsAuth, controller.getUserProfileHandler);
router.post(
  "/location",
  [IsAuth, checkSchema(schemas.setLocationSchema)],
  controller.setLocationHandler
);

router.patch("/profile/edit", IsAuth, controller.updateUserProfileHandler);

module.exports = router;
