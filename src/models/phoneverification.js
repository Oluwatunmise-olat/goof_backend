module.exports = (sequelize, DataTypes) => {
  const phoneVerification = sequelize.define("phoneVerification", {
    phone_number: {
      type: DataTypes.STRING,
      required: true
    },
    code: {
      type: DataTypes.STRING,
      required: true
    },
    verfied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return phoneVerification;
};
