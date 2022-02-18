const Sequelize = require("sequelize");
const config = require("config");

const host = config.get("DB_HOST");
const port = config.get("DB_PORT");
const DB_USERNAME = config.get("DB_USERNAME");
const DB_PASSWORD = config.get("DB_PASSWORD");
const DB_NAME = config.get("DB_NAME");

module.exports = function connect(cb) {
  const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host,
    port,
    dialect: "postgres",
    logger: false
  });

  try {
    await db.authenticate();
    // log message
    cb();
  } catch (error) {
    // log error
  }
};
