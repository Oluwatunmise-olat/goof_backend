const Sequelize = require("sequelize");
const config = require("config");

const host = config.get("db.DB_HOST");
const port = config.get("db.DB_PORT");
const DB_USERNAME = config.get("db.DB_USERNAME");
const DB_PASSWORD = config.get("db.DB_PASSWORD");
const DB_NAME = config.get("db.DB_NAME");

const db = new Sequelize({
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host,
  port,
  dialect: "postgres",
  logging: false
});

exports.connected = async function (cb) {
  try {
    await db.authenticate();
    // log message
    cb();
  } catch (error) {
    // log error
  }
};

let models = {
  user: require("../models/user")(db),
  sequelize:db
};

exports.models = models;
