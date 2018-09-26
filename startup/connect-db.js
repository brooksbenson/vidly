const mongoose = require('mongoose');
const debugDb = require('debug')('dev:startup');

mongoose
  .connect(
    'mongodb://localhost/vidly',
    { useNewUrlParser: true }
  )
  .then(() => debugDb('mongo connection successful'))
  .catch(() => debugDb('mongo connection failed'));
