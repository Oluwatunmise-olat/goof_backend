const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  /**
   * @params
   *  - token: This token is only valid for 30mins
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
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        required: true,
        type: DataTypes.ENUM({
          values: ["wallet", "account"]
        })
      },
      expiresIn: {
        type: DataTypes.TIME,
        defaultValue: moment().add(30, "minutes").format("hh:mm") // current time + 30 mins
      }
    },
    { modelName: "reset_token", underscored: true, timestamps: true }
  );
  return reset_token;
};
