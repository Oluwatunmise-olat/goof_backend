const express = require("express");

const config = require("config");
const app = express();

let { sequelize } = require("./src/models/index");
const accountRouter = require("./src/routes/account.routes");
const logger = require("./logger/log");

app.use(express.json());
const port = config.get("port");
app.use("/api", accountRouter);

sequelize
  .authenticate()
  .then(() => {
    app.listen(port || 3000, () => {
      logger.info("Server Connected");
    });
  })
  .catch((err) => {
    logger.error(err);
  });
