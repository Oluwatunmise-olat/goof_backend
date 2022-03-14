const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      required: true,
      unique: true
    },
    longitude: {
      type: DataTypes.DECIMAL,
      required: true,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL,
      required: true,
      allowNull: false
    }
  });

  Location.associate = (models) => {
    Location.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "user_location"
    });
  };
  return Location;
};
