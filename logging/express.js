const { path } = require('app-root-path');
const { createLogger, format, transports } = require('winston');

const expressLogger = createLogger({
  transports: [
    new transports.File({
      filename: `${path}/logging/logfile.log`
    }),
    new transports.Console()
  ],
  format: format.combine(
    format.label({ label: 'express-pipeline' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.prettyPrint()
  )
});

module.exports = { expressLogger };
