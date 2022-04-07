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

router.post(
  "/store/location/set",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.storeLocationSchema),
  controller.setStoreLocationHandler
);

router.patch(
  "/store/location/edit",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.editStoreLocationSchema),
  controller.updateStoreLocationHandler
);

router.post(
  "/store/menu/create",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.createStoreMenuSchema),
  controller.createStoreMenuHandler
);

router.patch(
  "/store/menu/edit",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.editStoreMenuSchema),
  controller.updateStoreMenuHandler
);

router.post(
  "/store/menu/add-availability",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.addMenuAvailabilitySchema),
  controller.addMenuAvailabilityHandler
);

router.delete(
  "/store/menu/remove-availability",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.removeMenuAvailabilitySchema),
  controller.removeMenuAvailabilityHandler
);

router.post(
  "/store/menu/create-category",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.createCategorySchema),
  controller.createMenuCategoryHandler
);

router.delete(
  "/store/menu/delete-category",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.deleteCategorySchema),
  controller.deleteMenuCategoryHandler
);

router.patch(
  "/store/menu/edit-category",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.updateCategorySchema),
  controller.updateMenuCategoryHandler
);

router.post(
  "/store/menu/create-modifier",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.createModifierSchema),
  controller.createCategoryModifierHandler
);

router.patch(
  "/store/menu/edit-modifier",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.updateModifierSchema),
  controller.updateCategoryModifierHandler
);

router.delete(
  "/store/menu/delete-modifier",
  IsAuth,
  IsVendorOrAdmin,
  checkSchema(schemas.deleteModifierSchema),
  controller.deleteCategoryModifierHandler
);

module.exports = router;
