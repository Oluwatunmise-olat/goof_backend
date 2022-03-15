let { sequelize } = require("./src/models/index");
const logger = require("./logger/log");
const app = require("./app");
const config = require("config");
const port = config.get("port");

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
