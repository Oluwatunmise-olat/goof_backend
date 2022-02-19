const express = require("express");

const config = require("config");
const app = express();

const db = require("./src/db/config");

const port = config.get("port");

db(() => {
  app.listen(port || 3000, () => {
    // log connected
  });
});

