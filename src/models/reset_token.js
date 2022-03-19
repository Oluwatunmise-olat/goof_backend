const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  /**
   * @attributes
   *  - token: This token is only valid for 5mins
   *  - type: This model is used for two actions of password reset (wallet pin and account password)
   */
  const reset_token = sequelize.define(
    "Reset_Token",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      token: {
        unique: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 6,
          max: 6
        }
      },
      type: {
        required: true,
        type: DataTypes.ENUM({
          values: ["wallet", "account"]
        })
      },
      expires_in: {
        type: DataTypes.TIME,
        defaultValue: moment().add(10, "minutes").format("hh:mm") // current time + 10 mins
      }
    },
    { modelName: "reset_token", underscored: true, timestamps: true }
  );
  return reset_token;
};
