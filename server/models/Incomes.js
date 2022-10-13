const { Schema } = require('mongoose');

const incomesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = incomesSchema;



