module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true
      }
    },
    { underscored: true, indexes: [{ fields: ["name"] }] }
  );
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      as: "users",
      foreignKey: "role_id"
    });

    Role.belongsToMany(models.Permission, {
      through: "role_permissions",
      foreignKey: "role_id",
      otherKey: "permission_id"
    });
  };
  return Role;
};
