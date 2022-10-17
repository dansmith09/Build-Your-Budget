const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost/buildyourbudget' || process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

module.exports = mongoose.connection;
