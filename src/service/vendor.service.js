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

exports.vendorDashboard = async () => {
  // show must bought item in store
  // total number of customers
  // sales detail
  // can be filtered
};

exports.viewStore = async () => {};

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

    if (resp.length == 0) {
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
exports.createStoreMenu = async () => {};
exports.editStoreMenu = async () => {};
exports.viewStoreMenu = async () => {};
exports.createMenuCategory = async () => {};
exports.editMenuCategory = async () => {};
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
