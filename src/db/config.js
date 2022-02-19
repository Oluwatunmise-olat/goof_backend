const Sequelize = require("sequelize");
const config = require("config");

const host = config.get("db.DB_HOST");
const port = config.get("db.DB_PORT");
const DB_USERNAME = config.get("db.DB_USERNAME");
const DB_PASSWORD = config.get("db.DB_PASSWORD");
const DB_NAME = config.get("db.DB_NAME");

console.log(DB_NAME, DB_USERNAME, DB_PASSWORD);

module.exports = async function connect(cb) {
  const db = new Sequelize({
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host,
    port,
    dialect: "postgres",
    logger: false
  });

  try {
    await db.authenticate();
    // log message
    console.log("connected");
    cb();
  } catch (error) {
    // log error
  }
};
