const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const { Customer, inputSchema } = require('../models/Customer');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// get all
router.get('/', async (req, res) => {
  // operation
  res.status(200).send(await Customer.find());
});

// get one
router.get('/:id', async (req, res) => {
  // normalization
  const { id } = req.params;
  // operation
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw new Error('Could not find customer with that id');
  else res.status(200).send(customer);
});

// update one
router.put('/:id', auth, async (req, res) => {
  // normalization
  const { id } = req.params;
  const input = _.pick(req.body, Object.keys(inputSchema));
  const schema = _.pick(inputSchema, Object.keys(input));
  await Joi.validate(input, schema);
  // operation
  const updatedCustomer = await Customer.findByIdAndUpdate(id, input, {
    new: true
  });
  res.status(200).send(updatedCustomer);
});

// create one
router.post('/', auth, async (req, res) => {
  // normalization
  const input = _.pick(req.body, Object.keys(inputSchema));
  await Joi.validate(input, inputSchema);
  // operation
  const customer = await new Customer().save();
  res.status(200).send(customer);
});

// remove one
router.delete('/:id', [auth, admin], async (req, res) => {
  // normalization
  const { id } = req.params;
  // operation
  const customer = await Customer.findByIdAndRemove(id);
  res.status(200).send(customer);
});

module.exports = router;
