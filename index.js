const config = require('config');
const express = require('express');
const app = express();
const debug = require('debug')('dev:startup');
require('./startup/connect-db');
require('./startup/error-handling');
require('./startup/middleware')(app);
require('./startup/routes')(app);

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is undefined');
  process.exit(1);
}

app.set('view engine', 'pug');
app.set('views', './views');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  debug(`Listening on port ${PORT}.`);
});
