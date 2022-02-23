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
    { indexes: [{ fields: ["name"] }] }
  );
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      as: "users",
      foreignKey: "role_id"
    });
  };
  return Role;
};
