const { Schema } = require('mongoose');

const incomeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = incomeSchema;



