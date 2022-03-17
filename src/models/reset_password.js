module.exports = (sequelize, DataTypes) => {
  const reset_password = sequelize.define(
    "Reset_Password",
    {
      email: {
        unique: false
      },
      token: {
        unique: true
      }
    },
    { modelName: "reset_password", underscored: true }
  );
  return reset_password;
};
