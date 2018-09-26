const express = require('express');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, inputSchema } = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// current user
router.get('/me', auth, async (req, res) => {
  // normalization
  const { _id } = req.user;
  // operation
  const user = await User.findById(_id).select('-password');
  res.status(200).send(user);
});

// all users
router.get('/all', [auth, admin], async (req, res) => {
  // operation
  const users = await User.find().select('-password');
  res.status(200).send(users);
});

// create user
router.post('/', async (req, res) => {
  // normalization
  const input = _.pick(req.body, Object.keys(inputSchema));
  await Joi.validate(input, inputSchema);
  // operation: password
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(input.password, salt);
  // operation: save user
  const user = await new User({ ...input, password }).save();
  // operation: give token
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['name', 'email', '_id']));
});

module.exports = router;
