const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Permission = sequelize.define(
    "Permission",
    {
      can: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      }
    },
    { indexes: [{ fields: ["can"] }] }
  );
  Permission.associate = () => {};
  return Permission;
};
