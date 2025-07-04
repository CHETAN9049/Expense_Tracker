const Expense = require("../models/Expense");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}); 

exports.addExpense = async (req, res) => {
    try {
        const userId = req.user;
        const { amount, date, category, note } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        if (amount > user.balance) {
            return res.status(400).send({ error: "Insufficient balance" });
        }

        if (user.categories && user.categories.length > 0) {
            const cat = user.categories.find(c => c.name === category);
            if (!cat) {
                return res.status(400).send({ error: "Category not found" });
            }
            cat.spent += amount;
            if (cat.spent > cat.limit) {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: `Spending Limit Exceeded: ${category}`,
                    text: `Hi ${user.username},\n\nYou have exceeded your monthly spending limit for the category "${category}".\n\nLimit: ₹${cat.limit}\nSpent: ₹${cat.spent}\n\nPlease review your expenses.\n\n- Expense Tracker`
                });
            }
        }
        const expense = new Expense({ userId, amount, date, category, note });
        await expense.save();

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
        const updateFields = req.body;

        const old = await Expense.findById(id);
        if (!old) return res.status(404).send({ error: "Expense not found" });

        const user = await User.findById(old.userId);

        if (updateFields.amount !== undefined) {
            user.balance += old.amount;
            user.balance -= updateFields.amount;
        }

        await Expense.findByIdAndUpdate(id, updateFields, { new: true });
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
