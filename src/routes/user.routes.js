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

module.exports = router;
