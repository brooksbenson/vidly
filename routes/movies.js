const express = require('express');
const Joi = require('joi');
const { Movie, inputSchema } = require('../models/Movie');
const deriveSchema = require('../models/helpers/deriveSchema');

const router = express.Router();

// createj

router.post('/', async (req, res) => {
  const input = { ...req.body };
  try {
    await Joi.validate(input, inputSchema);
    let movie = new Movie(input);
    movie = await movie.save();
    res.status(200).send(movie);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// read

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) throw new Error(`Movie with id ${id} was not found.`);
    else res.status(200).send(movie);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// update

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const input = { ...req.body };
  try {
    if (genres in input) {
      throw new Error('use api/movies/:id/genres to modify genres');
    }
    await Joi.validate(input, deriveSchema(input, inputSchema));
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { $set: { ...input } },
      { new: true }
    );
    res.status(200).send(updatedMovie);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put('/:id/genres', async (req, res) => {
  const { id } = req.params;
  const { genres } = req.body;
  try {
    await Joi.validate(genres, inputSchema.genres);
    const movie = await Movie.findById(id);
    for (let genre in genres) {
      if 
    }
  }
})

// delete

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndRemove(id);
    res.status(200).send(movie);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
