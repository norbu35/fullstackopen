const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
require('dotenv').config();

const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const { MongoUrl } = require('./utils/config');
const { info, error } = require('./utils/logger');
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExractor,
} = require('./utils/middleware');

const app = express();

// Connect to DB
info(`Connecting to ${MongoUrl}`);
mongoose
  .connect(MongoUrl)
  .then(() => info('Connected to MongoDB'))
  .catch((err) => error(`Error connecting to MongoDB: ${err.message}`));

// register middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(tokenExractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
