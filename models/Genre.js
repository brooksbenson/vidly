const mongoose = require('mongoose');
const Joi = require('joi');

exports.inputSchema = {
  name: Joi.string()
    .min(5)
    .max(50)
    .required()
};

exports.Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30
    }
  })
);
