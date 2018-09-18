const express = require('express');
const Joi = require('joi');
const { Customer, inputSchema } = require('../models/Customer');
const deriveSchema = require('../models/helpers/deriveSchema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).send(await Customer.find());
  } catch (err) {
    res.status(400).send('There was an error with your request');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) throw new Error('Could not find customer with that id');
    else res.status(200).send(customer);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  const updateSchema = deriveSchema(req.body, inputSchema);
  try {
    await Joi.validate(req.body, updateSchema);
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedCustomer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    await Joi.validate(req.body, inputSchema);
    const newCustomer = new Customer(req.body);
    res.status(200).send(await newCustomer.save());
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndRemove(req.params.id);
    res.status(200).send(deletedCustomer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
