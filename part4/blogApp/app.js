const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
require("dotenv").config();

const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");

const { MongoUrl } = require("./utils/config");
const { info, error } = require("./utils/logger");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExractor,
  userExtractor,
} = require("./utils/middlware");

const app = express();

// Connect to DB
info(`Connecting to ${MongoUrl}`);
mongoose
  .connect(MongoUrl)
  .then(() => info("Connected to MongoDB"))
  .catch((err) => error(`Error connecting to MongoDB: ${err.message}`));

// register middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(tokenExractor);
app.use("/api/blogs", userExtractor, blogsRouter);
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
