const _ = require('lodash');
const express = require('express');
const Joi = require('joi');
const { Movie, inputSchema } = require('../models/Movie');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// get all
router.get('/', async (req, res) => {
  // operation
  const movies = await Movie.find();
  res.status(200).send(movies);
});

// get one
router.get('/:id', async (req, res) => {
  // normalization
  const { id } = req.params;
  // operation
  const movie = await Movie.findById(id);
  if (!movie) throw new Error(`Movie with id ${id} was not found.`);
  else res.status(200).send(movie);
});

// update one
router.put('/:id', auth, async (req, res) => {
  // normalization
  const input = _.pick(req.body, Object.keys(inputSchema));
  const schema = _.pick(inputSchema, Object.keys(input));
  await Joi.validate(input, schema);
  // operation
  const movie = await Movie.findById(req.params.id);
  for (prop in input) {
    movie[prop] = input[prop];
  }
  await movie.save();
  res.status(200).send(movie);
});

// create one
router.post('/', auth, async (req, res) => {
  // normalization
  const input = _.pick(req.body, Object.keys(inputSchema));
  await Joi.validate(input, inputSchema);
  // operation
  let movie = await new Movie(input).save();
  res.status(200).send(movie);
});

// delete one
router.delete('/:id', [auth, admin], async (req, res) => {
  // normalization
  const { id } = req.params;
  // operation
  const movie = await Movie.findByIdAndRemove(id);
  res.status(200).send(movie);
});

module.exports = router;
