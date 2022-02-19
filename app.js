const express = require("express");

const config = require("config");
const app = express();

let { models, connected: db } = require("./src/db/config");

const port = config.get("port");

db(() => {
  app.listen(port || 3000, () => {
    // log connected
    console.log("Connected");
  });
});

const alter = process.env.NODE_ENV === "production" ? false : true;
models.sequelize.sync({ alter });
