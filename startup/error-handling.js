const winston = require('winston');
require('winston-mongodb');
const debug = require('debug')('dev:non-express');

winston.add(winston.transports.File, { filename: 'error.json' });
winston.add(winston.transports.MongoDB, {
  db: 'mongodb://localhost/vidly',
  level: 'error'
});

process.on('unhandledException', ex => {
  debug(ex);
  winston.error(ex, ex.message);
});

process.on('unhandledRejection', ex => {
  throw ex;
});
