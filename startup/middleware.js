const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const error = require('../middleware/error');

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(helmet());
  app.use(error);
  if (app.get('environment') === 'development') {
    app.use(morgan('tiny'));
  }
};
