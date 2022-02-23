module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("Permission", {
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
  });
  Permission.associate = (models) => {};
  return Permission;
};
