const mongoose = require('mongoose');
const Joi = require('joi');

exports.inputSchema = {
  title: Joi.string()
    .min(1)
    .max(50)
    .required(),
  genres: Joi.array().items(
    Joi.string()
      .min(1)
      .max(50)
      .required()
  ),
  dailyRentalRate: Joi.number().required(),
  numberInStock: Joi.number()
};

exports.Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      min: 1,
      max: 50
    },
    genres: {
      required: true,
      type: [String],
      min: 1,
      max: 50,
      lowercase: true
    },
    numberInStock: {
      type: Number,
      default: 0
    },
    dailyRentalRate: {
      type: Number,
      required: true
    }
  })
);
