const express = require("express");
const app = express();

const accountRouter = require("./src/routes/account.routes");
const userRouter = require("./src/routes/user.routes");
const oauthRouter = require("./src/routes/webhook.routes");

/**
 * App middlewares
 */

app.use(express.json());
app.use("/api/auth", accountRouter);
app.use("/api/users", userRouter);
app.use("/webhook", oauthRouter);

module.exports = app;
