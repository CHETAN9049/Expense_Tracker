const User = require('../models/User');

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

