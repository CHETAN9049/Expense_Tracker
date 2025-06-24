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
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ error: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).send({ error: "Invalid credentials" });

        if (user.twoFactorEnabled) {
            // creating a 6 digit verification code to send to user for 2FA. 
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            user.email2FACode = code;
            user.email2FACodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes till we considering code valid
            await user.save();

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Your 2FA Verification Code",
                text: `Your verification code is: ${code}`
            });

            return res.status(200).send({ message: "2FA code sent to your email", require2FA: true, userId: user._id });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).send({ token, user });
    } catch (error) {
        console.error('Error logging in:', error.message);
        return res.status(400).send({ error: 'Error logging in' });
    }
};

exports.verify2FAEmailCode = async (req, res) => {
    try {
        const { userId, code } = req.body;
        const user = await User.findById(userId);
        if (!user || !user.email2FACode) return res.status(400).send({ error: "2FA not initiated" });

        if (user.email2FACode !== code || user.email2FACodeExpires < new Date()) {
            return res.status(401).send({ error: "Invalid or expired code" });
        }

        user.email2FACode = undefined; // if verification done, clearing the code
        user.email2FACodeExpires = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).send({ token, user });
    } catch (error) {
        console.error('Error verifying 2FA code:', error.message);
        return res.status(400).send({ error: 'Error verifying 2FA code' });
    }
};