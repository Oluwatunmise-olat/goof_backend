module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        required: true,
        unique: true
      },
      can: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      }
    },
    { underscored: true }
  );
  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: "role_permissions",
      foreignKey: "permission_id",
      otherKey: "role_id"
    });
  };
  return Permission;
};
