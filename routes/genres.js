const express = require('express');
const Joi = require('joi');
const { Genre, inputSchema } = require('../models/Genre');
const routeDebug = require('debug')('dev:routes');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find().sort('name');
    res.status(200).send(genres);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findById(id);
    res.status(200).send(genre);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  const { name } = req.body;
  try {
    await Joi.validate({ name }, inputSchema);
    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).send(updatedGenre);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    await Joi.validate({ name }, inputSchema);
    const genre = new Genre({ name });
    res.status(200).send(await genre.save());
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Genre.findByIdAndRemove(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
