const services = require("../service/vendor.service");
const response = require("../utils/response");

exports.aboutVendorHandler = async (req, res, next) => {
  try {
    const resp = await services.aboutVendor(req);
    if (resp.error) {
      let code = resp.code == undefined ? "" : resp.code;
      return res
        .status(400)
        .json(response({ status: false, errorData: resp.errorData, code }));
    }

    return res.status(201).json(response({ status: true, msg: resp.msg }));
  } catch (error) {
    return next(error);
  }
};

/**
 * Store Handlers
 */
exports.createStoreHandler = async (req, res, next) => {
  try {
    const resp = await services.createStore(req);
    if (resp.error) {
      let code = resp.code == undefined ? "" : resp.code;
      return res
        .status(400)
        .json(response({ status: false, errorData: resp.errorData, code }));
    }

    return res
      .status(201)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
// todo
exports.getStoreHandler = async (req, res, next) => {};
exports.updateStoreHandler = async (req, res, next) => {
  try {
    const resp = await services.editStore(req);
    if (resp.error) {
      let code = resp.code == undefined ? "" : resp.code;
      return res
        .status(400)
        .json(response({ status: false, errorData: resp.errorData, code }));
    }

    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

/**
 * Location Handlers
 */
exports.setStoreLocationHandler = async (req, res, next) => {
  try {
    const resp = await services.setStoreLocation(req);
    if (resp.error) {
      let statusCode = resp.statusCode == undefined ? 400 : resp.statusCode;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }

    return res
      .status(201)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
// todo
exports.getStoreLocationHandler = async (req, res, next) => {};
exports.updateStoreLocationHandler = async (req, res, next) => {
  try {
    const resp = await services.editStoreLocation(req);
    if (resp.error) {
      let statusCode = resp.statusCode == undefined ? 400 : resp.statusCode;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }

    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};

/**
 * Store Menu Handlers
 */
exports.createStoreMenuHandler = async (req, res, next) => {
  try {
    const resp = await services.createStoreMenu(req);

    if (resp.error) {
      let statusCode = resp.statusCode == undefined ? 400 : resp.statusCode;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }

    return res
      .status(201)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
exports.updateStoreMenuHandler = async (req, res, next) => {
  try {
    const resp = await services.editStoreMenu(req);
    if (resp.error) {
      let statusCode = resp.statusCode == undefined ? 400 : resp.statusCode;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }

    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
// todo
exports.getStoreMenuHandler = async (req, res, next) => {};
exports.deleteStoreMenuHandler = async (req, res, next) => {};

/**
 * Menu Availablility Handlers
 */
exports.addMenuAvailabilityHandler = async (req, res, next) => {
  try {
    const resp = await services.addMenuAvailability(req);
    if (resp.error) {
      const statusCode = resp.code == undefined ? 400 : resp.code;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }
    return res.status(200).json(response({ status: true, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
exports.removeMenuAvailabilityHandler = async (req, res, next) => {
  try {
    const resp = await services.removeMenuAvailability(req);
    if (resp.error) {
      const statusCode = resp.code == undefined ? 400 : resp.code;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }
    return res.status(200).json(response({ status: true, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
// todo
exports.getMenuAvailabilityHandler = async (req, res, next) => {};

/**
 * Menu Category Handlers
 */
exports.createMenuCategoryHandler = async (req, res, next) => {
  try {
    const resp = await services.createCategory(req);
    if (resp.error) {
      const statusCode = resp.code === undefined ? 400 : resp.code;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }
    return res
      .status(201)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
exports.updateMenuCategoryHandler = async (req, res, next) => {
  try {
    const resp = await services.updateCategory(req);
    if (resp.error) {
      const statusCode = resp.code === undefined ? 400 : resp.code;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }
    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
exports.deleteMenuCategoryHandler = async (req, res, next) => {
  try {
    const resp = await services.deleteCategory(req);
    if (resp.error) {
      const statusCode = resp.code === undefined ? 400 : resp.code;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }
    return res.status(200).json(response({ status: true, msg: resp.msg }));
  } catch (error) {
    return next(error);
  }
};
// todo
exports.getMenuCategoryHandler = async (req, res, next) => {};

/**
 * Category Modifier Handlers
 */
// todo
exports.getCategoryModifierHandler = async (req, res, next) => {};
exports.createCategoryModifierHandler = async (req, res, next) => {
  try {
    const resp = await services.createModifier(req);
    if (resp.error) {
      const statusCode = resp.code == undefined ? 400 : resp.code;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }

    return res
      .status(201)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
exports.updateCategoryModifierHandler = async (req, res, next) => {
  try {
    const resp = await services.updateModifier(req);
    if (resp.error) {
      const statusCode = resp.code == undefined ? 400 : resp.code;
      return res
        .status(statusCode)
        .json(response({ status: false, errorData: resp.errorData }));
    }
    return res
      .status(200)
      .json(response({ status: true, msg: resp.msg, data: resp.data }));
  } catch (error) {
    return next(error);
  }
};
exports.deleteCategoryModifierHandler = async (req, res, next) => {};

/**
 * Modifier Option Handlers
 */
// todo
exports.getModifierOptionsHandler = async (req, res, next) => {};
exports.createModifierOptionsHandler = async (req, res, next) => {};
exports.updateModifierOptionsHandler = async (req, res, next) => {};
exports.deleteModifierOptionsHandler = async (req, res, next) => {};

// user cart stuff
// user order stuff
// user order history stuff
// vendor get order Notification
// order accepeted, rider_picked order
// payment for users (fund wallet, pay with wallet, pay with card)

// vendorz payment logic ....
