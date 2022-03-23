const models = require("../models/index");
const { validationResult } = require("express-validator");

const { extractMessage } = require("../utils/error");
const logger = require("../../logger/log");

exports.becomeAVendor = async () => {
  // would create a vendor user
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
