const { Schema } = require('mongoose');

const expensesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

module.exports = expensesSchema;



