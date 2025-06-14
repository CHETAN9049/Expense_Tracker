const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date
    },
    amount: {
        type: Number
    },
    category: {
        type: String
    },
    note: {
        type: String
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
