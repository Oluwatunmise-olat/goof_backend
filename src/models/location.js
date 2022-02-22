const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {});
  return Location;
};
