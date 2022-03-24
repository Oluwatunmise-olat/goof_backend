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
exports.createStore = async () => {};

exports.editStore = async () => {};
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
