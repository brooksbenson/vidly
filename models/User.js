const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const payload = _.pick(this, ['_id', 'isAdmin']);
  const key = config.get('jwtPrivateKey');
  return jwt.sign(payload, key);
};

module.exports.inputSchema = {
  name: Joi.string()
    .min(5)
    .max(50),
  email: Joi.string()
    .min(5)
    .max(50)
    .email(),
  password: Joi.string()
    .min(5)
    .max(50)
};

module.exports.User = mongoose.model('User', userSchema);
