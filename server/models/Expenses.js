const { Schema } = require('mongoose');

const expensesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  expense: {
    type: Int,
    required: true,
  },
});

module.exports = expensesSchema;



