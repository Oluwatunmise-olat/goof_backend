const models = require("../models/index");
const { validationResult } = require("express-validator");

const { extractMessage } = require("../utils/error");
const logger = require("../../logger/log");

exports.aboutVendor = async (req) => {
  // would create a vendor user
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { docs, about } = req.body;

  try {
    const [vendor, created] = await models.Vendor.findOrCreate({
      where: { owner: req.userID },
      defaults: {
        docs,
        about
      }
    });

    if (!created)
      return { error: true, errorData: [{ msg: "Already a Vendor" }] };

    return { error: false, msg: "Vendor Created" };
  } catch (error) {
    // log error
  }
};

exports.createStore = async (req) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { store_name, store_cover, store_avatar, store_phone_no } = req.body;

  try {
    const vendor = await models.Vendor.findOne({
      where: { owner: req.userID }
    });

    const {
      dataValues: { status }
    } = vendor;

    const [store, created] = await models.Store.findOrCreate({
      where: { vendor_id: req.userID },
      defaults: {
        store_name,
        store_avatar,
        store_cover,
        store_phone_no: store_phone_no.split("+")[1]
      }
    });

    if (!created)
      return {
        error: true,
        errorData: [{ msg: "Store Exists Already For User" }]
      };

    const { dataValues } = await store;

    return {
      error: false,
      msg: "Store Created",
      data: { ...dataValues, approval_status: status }
    };
  } catch (error) {
    // log error
    console.log(error.message);
  }
};

exports.editStore = async (req) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { store_name, store_cover, store_avatar, store_phone_no } = req.body;

  const data = {};
  if (store_name) data.store_name = store_name;
  if (store_phone_no) data.store_phone_no = store_phone_no.split("+")[1];
  if (store_avatar) data.store_avatar = store_avatar;
  if (store_cover) data.store_cover = store_cover;

  try {
    const [_, resp] = await models.Store.update(
      { ...data },
      {
        where: { vendor_id: req.userID },
        returning: true
      }
    );

    if (!resp || resp.length == 0) {
      return {
        error: true,
        errorData: [{ msg: "No store Associated with current vendor" }]
      };
    }

    updatedStore = resp[0].dataValues;

    const vendor = await models.Vendor.findOne({
      where: { owner: req.userID }
    });

    const {
      dataValues: { status }
    } = vendor;

    return {
      msg: "Store updated successfully",
      data: { ...updatedStore, approval_status: status }
    };
  } catch (error) {
    // log error
    console.log(error.message);
  }
};

exports.editStoreLocation = async (req) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { is_landmark, landmark, address, place_name, store_id } = req.body;

  const data = {};
  if (is_landmark) data.landmark = landmark;
  if (landmark) data.landmark = landmark;
  if (address) data.address = address;
  if (place_name) data.place_name = place_name;

  try {
    const store = await models.Store.findOne({
      where: { vendor_id: req.userID }
    });

    if (!store) {
      return {
        error: true,
        statusCode: 404,
        errorData: [{ msg: "No store exists for user" }]
      };
    }

    if (store.id != store_id) {
      return {
        error: true,
        statusCode: 403,
        errorData: [{ msg: "Unauthorized" }]
      };
    }

    const [_, resp] = await models.store_location.update(
      { ...data },
      {
        where: { id: store_id },
        returning: true
      }
    );

    if (!resp || resp.length == 0) {
      return {
        error: true,
        errorData: [{ msg: "store location not set" }]
      };
    }

    let updatedLocation = resp[0].dataValues;

    return {
      error: false,
      msg: "Location updated",
      data: { ...updatedLocation }
    };
  } catch (error) {
    // log error
    console.error(error);
  }
};

exports.setStoreLocation = async (req) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { is_landmark, landmark, address, place_name, store_id } = req.body;

  // validate the store is for current auth user

  try {
    const store = await models.Store.findOne({
      where: { vendor_id: req.userID }
    });

    if (!store) {
      return {
        error: true,
        statusCode: 404,
        errorData: [{ msg: "No store exists for user" }]
      };
    }

    if (store.id != store_id) {
      return {
        error: true,
        statusCode: 403,
        errorData: [{ msg: "Unauthorized" }]
      };
    }

    const storelocation = await models.store_location.create({
      id: store_id,
      place_name,
      landmark,
      is_landmark,
      address
    });

    const { dataValues } = storelocation;

    return {
      error: false,
      msg: "Location setup",
      data: { ...dataValues }
    };
  } catch (error) {
    // log error
    console.error(error);
  }
};

exports.createStoreMenu = async (req) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  // validate store associated with user exists
  // validate store_id
  try {
    const { store_id, deactivate, description, cover_image, menu_name } =
      req.body;

    const store = await models.Store.findOne({
      where: { vendor_id: req.userID }
    });

    if (!store) {
      return {
        error: true,
        statusCode: 404,
        errorData: [{ msg: "No store exists for user" }]
      };
    }

    if (store.id != store_id) {
      return {
        error: true,
        statusCode: 403,
        errorData: [{ msg: "Unauthorized" }]
      };
    }

    // create store menu
    const store_menu = await models.store_menus.create({
      store_id,
      deactivate,
      description,
      cover_image,
      menu_name
    });

    const { dataValues } = store_menu;

    return { error: false, data: { ...dataValues }, msg: "Store menu created" };
  } catch (error) {
    // log error
    console.log(error);
  }
};

exports.editStoreMenu = async (req) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { store_id, deactivate, description, cover_image, menu_id, menu_name } =
    req.body;

  const data = {};
  if (deactivate) data.deactivate = deactivate;
  if (cover_image) data.cover_image = cover_image;
  if (description) data.description = description;
  if (menu_name) data.menu_name = menu_name;

  try {
    const store = await models.Store.findOne({
      where: { vendor_id: req.userID }
    });

    if (!store) {
      return {
        error: true,
        statusCode: 404,
        errorData: [{ msg: "No store exists for user" }]
      };
    }

    if (store.id != store_id) {
      return {
        error: true,
        statusCode: 403,
        errorData: [{ msg: "Unauthorized" }]
      };
    }

    const [_, resp] = await models.store_menus.update(
      { ...data },
      {
        where: { store_id, id: menu_id },
        returning: true
      }
    );

    if (!resp || resp.length == 0) {
      return {
        error: true,
        errorData: [{ msg: "store menu doesn't exist " }]
      };
    }

    let updatedStoreMenu = resp[0].dataValues;

    return {
      error: false,
      msg: "store menu updated",
      data: { ...updatedStoreMenu }
    };
  } catch (error) {
    // log error
    console.error(error);
  }
};

exports.addMenuAvailability = async (req) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { menu_id, availability } = req.body;

  try {
    const menu = await models.store_menus.findOne({
      where: { id: menu_id },
      include: [models.Store]
    });

    if (!menu) {
      return {
        error: true,
        errorData: [{ msg: "Resource not found for passed 'menu_id'" }]
      };
    }

    const { dataValues: menuData } = menu;
    const {
      Store: { dataValues: storeData }
    } = menuData;

    if (!(storeData.vendor_id == req.userID)) {
      return { error: true, code: 403, errorData: [{ msg: "Unauthorized" }] };
    }

    let done = false;

    availability.forEach(({ week_day_id, close_time, open_time }, index) => {
      menu.addDay(week_day_id, {
        through: { open_time, close_time }
      });
      if (index == availability.length - 1) {
        done = true;
      }
    });

    if (done) {
      const menu_availabilities = await menu.getDays();

      const data = [];

      menu_availabilities.forEach(({ dataValues }) => {
        const {
          menu_availabilities: { dataValues: menuAvailabilitiesValues }
        } = dataValues;

        data.push({
          week_day_name: dataValues.name,
          ...menuAvailabilitiesValues
        });
      });

      return { error: false, data: data };
    }
  } catch (error) {
    const errorName = error.name;
    if (errorName === "SequelizeForeignKeyConstraintError") {
      return {
        erorr: true,
        errorData: [{ msg: "menu availability already exists" }]
      };
    }
    console.log(error.name, error.message, "op");
  }
};

exports.removeMenuAvailability = async (req) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { menu_id, availability } = req.body;

  try {
    const menu = await models.store_menus.findOne({
      where: { id: menu_id },
      include: [models.Store]
    });

    if (!menu) {
      return {
        error: true,
        errorData: [{ msg: "Resource not found for passed 'menu_id'" }]
      };
    }

    const { dataValues: menuData } = menu;
    const {
      Store: { dataValues: storeData }
    } = menuData;

    if (!(storeData.vendor_id == req.userID)) {
      return { error: true, code: 403, errorData: [{ msg: "Unauthorized" }] };
    }

    let done = false;

    availability.forEach(async ({ week_day_id }, index) => {
      await menu.removeDays(week_day_id);

      if (index == availability.length - 1) {
        done = true;
      }
    });

    if (done) {
      const menu_availabilities = await menu.getDays();

      const data = [];

      menu_availabilities.forEach(({ dataValues }) => {
        const {
          menu_availabilities: { dataValues: menuAvailabilitiesValues }
        } = dataValues;

        data.push({
          week_day_name: dataValues.name,
          ...menuAvailabilitiesValues
        });
      });

      return { error: false, data: data };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.vendorDashboard = async () => {
  // show must bought item in store
  // total number of customers
  // sales detail
  // can be filtered
};
exports.viewStore = async () => {
  // location
  // store approval status
};
exports.createStoreMenu = async () => {};
exports.editStoreMenu = async () => {};
exports.viewStoreMenu = async () => {};

exports.createMenuCategory = async () => {};
exports.editMenuCategory = async () => {};

exports.vendorDashboard = async () => {
  // show must bought item in store
  // total number of customers
  // sales detail
  // can be filtered
};
exports.viewStore = async () => {
  // location
  // store approval status
};
exports.viewStoreMenu = async () => {};
exports.getStoreNotifications = async () => {};
exports.getOrderHistory = async () => {
  // order id
  // date
  // status
  // customer
  // items
  // actual payout
  // remitted payout
};
exports.getPaymentHistory = async () => {
  // payment status
  // paymant transaction references
  // amount paid
  // next payout
  // last payout
};
exports.addBank = async () => {};
exports.updateBank = async () => {};
// payment method

// endpoint to list all available days
