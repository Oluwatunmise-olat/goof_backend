const router = require("express").Router();
const { checkSchema } = require("express-validator");

const controller = require("../controllers/vendor.controller.js");
const schemas = require("../schema/vendor.schema");
const IsAuth = require("../middleware/auth.middleware");
const { IsVendorOrAdmin } = require("../middleware/permission.middleware");
const BodyFieldErrorMiddleware = require("../middleware/bodyFieldErrors.middleware");


router.post(
  "/about",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.aboutVendorSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.aboutVendorHandler
);

router.post(
  "/store/create",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.createStoreSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.createStoreHandler
);

router.patch(
  "/store/edit",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.editStoreSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.updateStoreHandler
);

router.post(
  "/store/location/set",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.storeLocationSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.setStoreLocationHandler
);

router.patch(
  "/store/location/edit",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.editStoreLocationSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.updateStoreLocationHandler
);

router.post(
  "/store/menu/create",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.createStoreMenuSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.createStoreMenuHandler
);

router.patch(
  "/store/menu/edit",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.editStoreMenuSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.updateStoreMenuHandler
);

router.post(
  "/store/menu/add-availability",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.addMenuAvailabilitySchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.addMenuAvailabilityHandler
);

router.delete(
  "/store/menu/remove-availability",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.removeMenuAvailabilitySchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.removeMenuAvailabilityHandler
);

router.post(
  "/store/menu/create-category",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.createCategorySchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.createMenuCategoryHandler
);

router.delete(
  "/store/menu/delete-category",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.deleteCategorySchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.deleteMenuCategoryHandler
);

router.patch(
  "/store/menu/edit-category",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.updateCategorySchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.updateMenuCategoryHandler
);

router.post(
  "/store/menu/create-modifier",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.createModifierSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.createCategoryModifierHandler
);

router.patch(
  "/store/menu/edit-modifier",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.updateModifierSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.updateCategoryModifierHandler
);

router.delete(
  "/store/menu/delete-modifier",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.deleteModifierSchema),
  BodyFieldErrorMiddleware.getFieldErrors,
  controller.deleteCategoryModifierHandler
);

module.exports = router;
