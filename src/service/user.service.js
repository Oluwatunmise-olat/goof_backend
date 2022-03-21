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

exports.getUserProfile = async (req) => {
  try {
    const { dataValues } = await models.User.findOne({
      where: { id: req.userID },
      attributes: { exclude: ["password", "role_id"] },
      include: [
        {
          model: models.Role,
          as: "roleData",
          attributes: ["id", "name"]
        }
      ]
    });
    const { dataValues: roleData } = dataValues.roleData;
    let locationData = await models.Location.findOne({
      where: { user_id: req.userID }
    });
    if (!locationData) {
      locationData = {};
    } else {
      locationData = locationData.dataValues;
    }

    return { data: { ...dataValues, roleData, locationData: {} } };
  } catch (error) {
    // log error
    console.log(error.message);
  }
};

exports.updateUserProfile = async (req) => {
  const { errors } = validationResult(req);
  const resp = { error: false };

  if (errors.length > 0) {
    const errorsArr = extractMessage(errors);
    return { error: true, errorData: errorsArr };
  }

  const { firstname, lastname, avatar } = req.body;
  const data = {};
  if (firstname) data.push(firstname);
  if (lastname) data.push(lastname);
  if (avatar) data.push(avatar);

  try {
    const user = await models.User.update(
      { ...data },
      { where: { id: req.userID } }
    );

    delete user.dataValues.password;

    return {
      ...resp,
      msg: "User updated successfully",
      data: { ...user.dataValues }
    };
  } catch (error) {}
};

// today
exports.getCart = async (req) => {};

exports.getNotifications = (req) => {};

exports.updateNotification = async (req) => {};

exports.getNotification = async (req) => {};

exports.getOrderHistory = async (req) => {};

exports.getOrder = async (req) => {};

exports.createOrder = async (req) => {};

exports.updateOrder = async (req) => {};
