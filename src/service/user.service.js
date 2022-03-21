const models = require("../models/index");


exports.setLocation = async (req) => {
  const { errors } = validationResult(req);
  const resp = { error: false };

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { longitude, latitude } = req.body;

  try {
    let userLocation;
    userLocation = await models.Location.findOne({
      where: { id: req.userID }
    });
    if (!userLocation) {
      userLocation = await models.Location.create({
        user_id: req.userID,
        longitude,
        latitude
      });
    } else {
      userLocation.longitude = longitude;
      userLocation.latitude = latitude;
      await userLocation.save();
    }
    return {
      ...resp,
      msg: "Location updated successfully",
      data: userLocation.dataValues
    };
  } catch (error) {
    // log error
    console.error(error);
  }
};

exports.getWalletHistory = async (req) => {};

// today
exports.getUserProfile = async (req) => {};

// today
exports.updateUserProfile = async (req) => {};

// today
exports.getCart = async (req) => {};

exports.getNotifications = (req) => {};

exports.updateNotification = async (req) => {};

exports.getNotification = async (req) => {};

exports.getOrderHistory = async (req) => {};

exports.getOrder = async (req) => {};

exports.createOrder = async (req) => {};

exports.updateOrder = async (req) => {};
