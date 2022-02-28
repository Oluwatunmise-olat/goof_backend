const { createLogger, format, transports } = require("winston");

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4
};

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "DD-MMM-YYY HH:mm:ss" }),
    format.printf(
      (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
    )
  ),
  levels: logLevels,
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "logs/app.log", level: "error" })
  ]
});

module.exports = logger;
