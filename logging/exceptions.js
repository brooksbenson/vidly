const { path } = require('app-root-path');
const { createLogger, format, transports } = require('winston');

const unhandledExceptions = createLogger({
  exceptionHandlers: [
    new transports.File({
      filename: `${path}/logging/logs/exceptions.log`
    }),
    new transports.Console()
  ],
  format: format.combine(
    format.label({ label: 'Unhandled exception' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => {
      delete info.process;
      delete info.message;
      delete info.trace;
      delete info.stack;
      delete info.os;
      delete info.date;
    }),
    format.prettyPrint()
  )
});
