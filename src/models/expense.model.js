const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema(
  {
    name: {
      type: Number,
      required: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
      maxlength: 255,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
      minlength: 1,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentMethod: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Expense', ExpenseSchema);
