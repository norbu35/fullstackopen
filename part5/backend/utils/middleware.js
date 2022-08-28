const jwt = require('jsonwebtoken');
const { info, error } = require('./logger');

const tokenExractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }

  return next();
};

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  req.user = decodedToken.id;

  return next();
};

const requestLogger = (req, res, next) => {
  info('Method: ', req.method);
  info('Path: ', req.path);
  info('Body: ', req.body);
  info('---');

  return next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send('Unknown endpoint');
};

const errorHandler = (err, req, res, next) => {
  error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted ID' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  return next(err);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExractor,
  userExtractor,
};
