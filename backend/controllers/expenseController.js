const Expense = require("../models/Expense");
const User = require("../models/User");

exports.addExpense = async (req, res) => {
    try {
        const { userId, amount, date, category, note } = req.body;
        const expense = new Expense({ userId, amount, date, category, note });
        await expense.save();

        const user = await User.findById(userId);
        user.balance -= amount;
        await user.save();

        return res.status(201).send({ message: "Expense recorded", balance: user.balance });
    } catch (error) {
        console.error('Error adding expense:', error.message);
        return res.status(400).send({ error: 'Error adding expense' });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const { page = 1, limit = 5, sortBy = "date", order = "desc" } = req.query;
        const { userId } = req.params;

        const expenses = await Expense.find({ userId }).sort({ [sortBy]: order === "asc" ? 1 : -1 }).skip((page - 1) * limit).limit(Number(limit));

        const count = await Expense.countDocuments({ userId });

        return res.status(200).send({ expenses, totalPages: Math.ceil(count / limit) });
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
        return res.status(500).send({ error: 'Error fetching expenses' });
    }
};

exports.editExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, date, category, note } = req.body;

        const old = await Expense.findById(id);
        const user = await User.findById(old.userId);

        user.balance += old.amount;
        user.balance -= amount;

        await Expense.findByIdAndUpdate(id, { amount, date, category, note });
        await user.save();

        return res.status(200).send({ message: "Expense updated", balance: user.balance });
    } catch (error) {
        console.error('Error updating expense:', error.message);
        return res.status(400).send({ error: 'Error updating expense' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await Expense.findById(id);
        if (!expense) return res.status(404).send({ error: "Expense not found" });

        const user = await User.findById(expense.userId);
        user.balance += expense.amount;

        await Expense.findByIdAndDelete(id);
        await user.save();

        return res.status(200).send({ message: "Expense deleted", balance: user.balance });
    } catch (error) {
        console.error('Error deleting expense:', error.message);
        return res.status(500).send({ error: 'Error deleting expense' });
    }
};
