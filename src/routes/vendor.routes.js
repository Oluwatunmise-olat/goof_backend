const router = require("express").Router();
const { checkSchema } = require("express-validator");

const controller = require("../controllers/vendor.controller.js");
const schemas = require("../schema/vendor.schema");
const IsAuth = require("../middleware/auth.middleware");
const { IsVendorOrAdmin } = require("../middleware/permission.middleware");

router.post(
  "/about",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.aboutVendorSchema),
  controller.aboutVendorHandler
);

router.post(
  "/store/create",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.createStoreSchema),
  controller.createStoreHandler
);

router.patch(
  "/store/edit",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.editStoreSchema),
  controller.updateStoreHandler
);

module.exports = router;
