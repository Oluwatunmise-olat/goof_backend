"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};
const models={}

let sequelize;
const config = require("config");

const host = config.get("db.DB_HOST");
const port = config.get("db.DB_PORT");
const DB_USERNAME = config.get("db.DB_USERNAME");
const DB_PASSWORD = config.get("db.DB_PASSWORD");
const DB_NAME = config.get("db.DB_NAME");

sequelize = new Sequelize({
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host,
  port,
  dialect: "postgres",
  logging: false
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
