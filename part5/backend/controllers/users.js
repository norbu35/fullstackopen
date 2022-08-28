const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const SALTROUNDS = 10;
  const { username, name, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'username is already in use' });
  }
  if (!(username && password)) {
    return res
      .status(400)
      .json({ error: 'username and password has to be provided' });
  }
  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: 'username must be longer than 3 characters' });
  }
  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: 'password must be longer than 3 characters' });
  }

  const passwordHash = await bcrypt.hash(password, SALTROUNDS);
  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUser.save();
  return res.status(201).json(savedUser);
});

module.exports = userRouter;
