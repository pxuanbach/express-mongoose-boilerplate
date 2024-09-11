const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  levels: config.npm.levels,
	transports: [
		new transports.Console({
      format: combine(
        format.colorize(), timestamp(), format.simple()
      )
    }),
    new transports.File({
      filename: './log/error.log',
      level: 'error',
      format: combine(
        timestamp(), format.simple()
      )
    }),
    new transports.File({
      filename: './log/combined.log',
      format: combine(
        timestamp(), format.simple()
      )
    }),
	]
})

module.exports = logger;
