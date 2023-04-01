const winston = require("winston");
const path = require("path");
const options = {
  file: {
    level: "info",
    filename: path.join(__dirname, "../logs/info.log"),
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 10,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.prettyPrint()
    ),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.prettyPrint()
    ),
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = (Error, req, res, next) => {
  if (
    !Error.statusCode ||
    Error.statusCode.toString().startsWith("5")
  ) {
    logger.error("", Error);
  }
  res.status(Error.statusCode || 500);
  res.send({
    error: Error.status || "error",
    message: Error.statusCode.toString().startsWith("5")
      ? "Internal Server Error"
      : Error.message,
  });
};
