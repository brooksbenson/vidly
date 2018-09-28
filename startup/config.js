const config = require('config');

module.exports = () => {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: no jwt private key provided.');
  }
};
