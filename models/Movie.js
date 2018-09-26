const mongoose = require('mongoose');
const Joi = require('joi');

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

const Movie = mongoose.model(
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
      lowercase: true,
      set(updates) {
        const copy = { ...this.genres };
        updates.forEach(u => {
          if (u[0] === '-') {
            const i = copy.indexOf(u.slice(1));
            if (i === -1) {
              throw new Error(`${u} is not a listed genre for this movie`);
            }
            copy.splice(i, 1);
          } else {
            if (copy.includes(u)) {
              throw new Error(`${u} is already a listed genre for this movie`);
            }
            copy.push(u);
          }
        });
        return copy;
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
  })
);

module.exports = { inputSchema, Movie };
