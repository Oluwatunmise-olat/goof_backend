const express = require("express");
const app = express();

const accountRouter = require("./src/routes/account.routes");
const oauthRouter = require("./src/routes/webhook.routes");

/**
 * App middkewares
 */

app.use(express.json());
app.use("/api", accountRouter);
app.use("/webhook", oauthRouter);

module.exports = app;
