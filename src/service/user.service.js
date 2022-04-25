const models = require("../models/index");

const logger = require("../../logger/log");

exports.setLocation = async (req) => {
  const resp = { error: false };

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
      where: { user_id: req.userID },
      attributes: { exclude: ["user_id"] }
    });
    if (locationData.dataValues.length == 0) {
      locationData = {};
    } else {
      locationData = locationData.dataValues;
    }

    return { data: { ...dataValues, roleData, locationData } };
  } catch (error) {
    // log error
    console.log(error.message);
  }
};

exports.updateUserProfile = async (req) => {
  const { firstname, lastname, avatar } = req.body;
  const data = {};
  if (firstname) data.firstname = firstname;
  if (lastname) data.lastname = lastname;
  if (avatar) data.avatar = avatar;

  try {
    const [_, resp] = await models.User.update(
      { ...data },
      {
        where: { id: req.userID },
        returning: true,
        fields: ["firstname", "lastname", "avatar"]
      }
    );

    updatedUser = resp[0].dataValues;
    delete updatedUser.password;
    delete updatedUser.role_id;

    return {
      msg: "User updated successfully",
      data: { ...updatedUser }
    };
  } catch (error) {}
};

exports.createStoreRating = async (req) => {};

class UserService {
  getNotification() {}
  updateNotification() {}
  getOrderHistory() {}
  getOrder() {}
  createOrder() {}
  updateOrder() {}
  getCart() {}
  addToCart() {}
  getProfile() {}
  updateProfile() {}
  setLocation() {}
}

module.exports = new UserService();
