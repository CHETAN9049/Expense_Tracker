const User = require('../models/User');
const speakeasy = require("speakeasy");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) return res.status(404).send({ error: 'User not found' });
    return res.status(200).send({ user });
  } catch (err) {
    return res.status(500).send({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user, updates, { new: true, select: '-password' });
    if (!user) return res.status(404).send({ error: 'User not found' });
    return res.status(200).send({ user });
  } catch (err) {
    return res.status(500).send({ error: 'Server error' });
  }
};

exports.completeProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id || req.user;
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

exports.setup2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user._id || req.user);
    if (!user) return res.status(404).send({ error: "User not found" });

    const secret = speakeasy.generateSecret({ length: 20 });
    user.twoFactorSecret = secret.base32;
    await user.save();

    const token = speakeasy.totp({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      step: 30,
    });
    // For production, send QR or email, not console.log
    console.log(`The 2FA code for ${user.email}: ${token}`);
    return res.status(200).send({ message: "2FA setup successful", secret: user.twoFactorSecret, token });
  }
  catch (error) {
    console.error('Error setting up 2FA:', error.message);
    return res.status(400).send({ error: 'Error setting up 2FA' });
  }
};

exports.verify2FA = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findById(req.user.id || req.user._id || req.user);
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
};