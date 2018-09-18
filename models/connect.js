const mongoose = require('mongoose');
const debugDb = require('debug')('dev:db');

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => debugDb('mongo connection successful'))
  .catch(() => debugDb('mongo connection failed'));
