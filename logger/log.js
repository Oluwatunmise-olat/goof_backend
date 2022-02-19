const { createLogger, format, transports } = require("winston");

const logLevels = {
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
};

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  levels: logLevels,
  transports: [new transports.Console()]
});
