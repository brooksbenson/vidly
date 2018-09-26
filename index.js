// Dependencies
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app');
const winston = require('winston');
const error = require('./middleware/error');
require('winston-mongodb');
// custom routers
require('express-async-errors');
const pagesRouter = require('./routes/pages');
const genresRouter = require('./routes/genres');
const customersRouter = require('./routes/customers');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

require('./models/connect');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is undefined');
  process.exit(1);
}

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/', pagesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use(error);

// views
app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'development') {
  app.use(morgan());
  debug('app in dev');
  debug('morgan enabled...');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
