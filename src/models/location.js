const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Location = sequelize.define("Location", {});
  return Location;
};
