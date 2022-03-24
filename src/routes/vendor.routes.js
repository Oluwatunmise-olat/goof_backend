const router = require("express").Router();
const { checkSchema } = require("express-validator");

const controller = require("../controllers/vendor.controller.js");
const schemas = require("../schema/vendor.schema");
const IsAuth = require("../middleware/auth.middleware");

// is a vendor(role) middleware
router.post(
  "/about",
  [IsAuth, checkSchema(schemas.aboutVendorSchema)],
  controller.aboutVendorHandler
);

module.exports = router;
