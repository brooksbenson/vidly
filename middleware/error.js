const expressLogger = require('../logging/express');

module.exports = function(err, req, res, next) {
  expressLogger.info(err.message, err);
  res.status(500).send('Something failed.');
};
