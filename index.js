// depencies
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app');
const pagesRouter = require('./routes/pages');
const genresRouter = require('./routes/genres');
const customersRouter = require('./routes/customers');
require('./models/connect');

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', pagesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);

// views
app.set('view engine', 'pug');
app.set('views', './views');

// config
console.log(`App name: ${config.get('name')}`);
console.log(`Mail host: ${config.get('mail.host')}`);
console.log(`Mail password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan());
  debug('app in dev');
  debug('morgan enabled...');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
