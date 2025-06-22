const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.login = async (req, res) => {
    try {
        const { email, password, code } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ error: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).send({ error: "Invalid credentials" });

        if (user.twoFactorEnabled) {
            if (!code) return res.status(401).send({ error: "2FA code is required" });
            const speakeasy = require("speakeasy");
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
