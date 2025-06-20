const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

exports.setup2FA = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) return res.status(404).send({ error: "User not found" });

        const secret = speakeasy.generateSecret({ length: 20 });
        user.twoFactorSecret = secret.base32;
        await user.save();

        const token = speakeasy.totp({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            step: 30,
        });
        console.log(`The 2FA code for ${user.email}: ${token}`);
        return res.status(200).send({ message: "2FA setup successful", secret: user.twoFactorSecret, token });
    }
    catch (error) {
        console.error('Error setting up 2FA:', error.message);
        return res.status(400).send({ error: 'Error setting up 2FA' });
    }
}

exports.verify2FA = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await User.findById(req.user);
        if (!user || !user.twoFactorSecret) return res.status(404).send({ error: "User not found or 2FA not set up" });

        const isValid = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: code,
            window: 2,
        });

        if (!isValid) return res.status(401).send({ error: "Invalid 2FA token" });
        user.twoFactorEnabled = true;
        await user.save();

        return res.status(200).send({ message: "2FA verification successful" });
    } catch (error) {
        console.error('Error verifying 2FA:', error.message);
        return res.status(400).send({ error: 'Error verifying 2FA' });
    }
}

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).send({ error: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashed });
        await user.save();
        return res.status(201).send({ message: "User registered", userId: user._id });
    } catch (error) {
        console.error('Error registering user:', error.message);
        return res.status(400).send({ error: 'Error registering user' });
    }
};

exports.completeProfile = async (req, res) => {
    try {
        const userId = req.user._id; // assuming authentication middleware sets req.user
        const { initialBalance, monthlySalary, customCategories = [], categoryLimits = {} } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).send({ error: "User not found" });

        user.balance = initialBalance;
        user.monthlySalary = monthlySalary;

        const defaultCategories = ['food', 'entertainment', 'essentials'];
        const allCategories = [...new Set([...defaultCategories, ...customCategories])];

        user.categories = allCategories.map(cat => ({
            name: cat,
            limit: categoryLimits[cat] || 0,
            spent: 0
        }));

        await user.save();
        return res.status(200).send({ message: "Profile completed successfully" });
    } catch (error) {
        console.error('Error completing profile:', error.message);
        return res.status(400).send({ error: 'Error completing profile' });
    }
};

exports.addTransaction = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const { amount, category } = req.body;
        if (amount > user.balance) {
            return res.status(400).send({ error: "Insufficient balance" });
        }
        const cat = user.categories.find(c => c.name === category);
        if (!cat) {
            return res.status(400).send({ error: "Category not found" });
        }
        cat.spent = cat.spent + amount;
        user.balance = user.balance - amount;

        if (cat.spent > cat.limit) {
            console.warn(`Warning: Spending in category ${category} has exceeded the limit of ${cat.limit}. Current spending: ${cat.spent}`);
        }
        await user.save();
        return res.status(200).send({ message: "Transaction successful", balance: user.balance });
    } catch (error) {
        return res.status(400).send({ error: "Transaction failed" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password, code } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ error: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).send({ error: "Invalid credentials" });

        if (user.twoFactorEnabled) {
            if (!code) return res.status(401).send({ error: "2FA code is required" });
            const isValid = speakeasy.totp.verify({
                secret: user.twoFactorSecret,
                encoding: 'base32',
                token: code,
                window: 2,
            });

            if (!isValid) return res.status(401).send({ error: "Invalid 2FA token" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).send({ token, user });
    } catch (error) {
        console.error('Error logging in:', error.message);
        return res.status(400).send({ error: 'Error logging in' });
    }
};
