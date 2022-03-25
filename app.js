const express = require("express");
const app = express();

const accountRouter = require("./src/routes/account.routes");
const userRouter = require("./src/routes/user.routes");
const vendorRouter = require("./src/routes/vendor.routes");
const oauthRouter = require("./src/routes/webhook.routes");
const {
  interalServerError: serverError
} = require("./src/routes/error.routes");

/**
 * App middlewares
 */

app.use(express.json());
app.use("/api/auth", accountRouter);
app.use("/api/users", userRouter);
app.use("/api/vendors", vendorRouter);
app.use("/webhook", oauthRouter);

app.use(serverError);

module.exports = app;
