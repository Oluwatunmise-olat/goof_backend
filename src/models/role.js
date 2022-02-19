const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      }
    },
    { indexes: [{ fields: ["name"] }] }
  );
  Role.associate = () => {};
  return Role;
};
