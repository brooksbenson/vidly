const mongoose = require('mongoose');
const Joi = require('joi');

exports.inputSchema = {
  name: Joi.string()
    .min(5)
    .required(),
  number: Joi.string()
    .min(10)
    .required(),
  isGold: Joi.bool()
};

exports.Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    number: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    isGold: {
      type: Boolean,
      default: false
    }
  })
);
