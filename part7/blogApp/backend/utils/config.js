require('dotenv').config();

const { PORT } = process.env;
const MongoUrl = process.env.MONGODB_URI;

module.exports = {
  PORT,
  MongoUrl,
};
