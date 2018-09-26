const mongoose = require('mongoose');
const Joi = require('joi');
const { cleanArray } = require('cleanly');

const inputSchema = {
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

const movieSchema = new mongoose.Schema({
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
    lowercase: true,
    set(genres) {
      return genres.map(g => g.toLowerCase());
    }
  },
  numberInStock: {
    type: Number,
    default: 0
  },
  dailyRentalRate: {
    type: Number,
    required: true
  }
});

movieSchema.methods.updateGenres = function(updates) {
  const map = {
    ...cleanArray(this.genres),
    ...cleanArray(updates)
  };
  this.genres = [];
  for (genre in map) {
    let keep = map[genre];
    if (keep) this.genres.push(genre);
  }
};

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { inputSchema, Movie };
