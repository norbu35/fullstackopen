const testingRouter = require('express').Router();
const User = require('../models/userModel');
const Blog = require('../models/blogModel');

testingRouter.post('/reset', async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  res.status(200).end();
});

module.exports = testingRouter;
