const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const { Genre, inputSchema } = require('../models/Genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// get all
router.get('/', async (req, res) => {
  // operation
  const genres = await Genre.find().sort('name');
  res.status(200).send(genres);
});

// get one
router.get('/:id', async (req, res) => {
  // normalization
  const { id } = req.params;
  // operation
  const genre = await Genre.findById(id);
  res.status(200).send(genre);
});

// update one
router.put('/:id', auth, async (req, res) => {
  // normalization
  const { id } = req.params;
  const input = _.pick(req.body, Object.keys(inputSchema));
  const schema = _.pick(inputSchema, Object.keys(input));
  await Joi.validate(input, schema);
  // operation
  const updatedGenre = await Genre.findByIdAndUpdate(id, input, {
    new: true
  });
  res.status(200).send(updatedGenre);
});

// create one
router.post('/', auth, async (req, res) => {
  // normalization
  const input = _.pick(req.body, Object.keys(inputSchema));
  await Joi.validate(input, inputSchema);
  // operation
  const createdGenre = await new Genre(input).save();
  res.status(200).send(createdGenre);
});

// delete one
router.delete('/:id', [auth, admin], async (req, res) => {
  // normalization
  const { id } = req.params;
  // operation
  const deletedGenre = await Genre.findByIdAndRemove(req.params.id);
  res.status(200).send(deletedGenre);
});

module.exports = router;
