const express = require("express");

const config = require("config");
const app = express();

let { sequelize } = require("./src/models/index");
const accountRouter = require("./src/routes/account.routes");
const oauthRouter = require("./src/routes/webhook.routes");
const logger = require("./logger/log");

const port = config.get("port");

/**
 * App middkewares
 */

app.use(express.json());
app.use("/api", accountRouter);
app.use("/webhook", oauthRouter);

/**
 * DB setup and server startup
 */

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

