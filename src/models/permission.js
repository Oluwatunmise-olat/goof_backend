module.exports = (sequelize, DataTypes) => {
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
  Permission.associate = (models) => {};
  return Permission;
};
