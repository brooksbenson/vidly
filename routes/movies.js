const express = require('express');
const Joi = require('joi');
const { Movie, inputSchema } = require('../models/Movie');
const updateObj = require('../helpers/update-object');

const router = express.Router();

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

router.put('/:id', async (req, res) => {
  const input = { ...req.body };
  try {
    await Joi.validate(input, updateObj(inputSchema, Object.keys(input)));
    const movie = await Movie.findById(req.params.id);
    updateMovie(movie, input);
    await movie.save();
    res.status(200).send(movie);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

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

// helpers
function updateMovie(movie, input) {
  // movie needs to be updated according to the input
  for (path in input) {
    path === 'genres'
      ? updateGenres(movie.genres, input.genres)
      : (movie[path] = input[path]);
  }
}

function updateGenres(original, updates) {
  updates.forEach(u => {
    if (u[0] === '-') {
      const i = original.indexOf(u.slice(1));
      if (i === -1) {
        throw new Error(`${u} is not a listed genre for this movie`);
      }
      original.splice(i, 1);
    } else {
      if (original.includes(u)) {
        throw new Error(`${u} is already a listed genre for this movie`);
      }
      original.push(u);
    }
  });
}
