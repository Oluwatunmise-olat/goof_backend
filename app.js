const express = require("express");

const config = require("config");
const app = express();

let { sequelize } = require("./src/models/index");
const accountRouter = require("./src/routes/account.routes");

app.use(express.json());
const port = config.get("port");
app.use("/api", accountRouter);

sequelize
  .authenticate()
  .then(() => {
    app.listen(port || 3000, () => {
      // log connected
      console.log("Connected");
    });
  })
  .catch((err) => {
    console.error(err);
  });
