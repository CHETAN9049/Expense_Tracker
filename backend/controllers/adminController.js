const User = require('../models/User');

exports.listUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = '' } = req.query;
    const query = search ? { username: { $regex: search, $options: 'i' } } : {};
    const users = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await User.countDocuments(query);
    return res.status(200).send({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    return res.status(500).send({ error: 'Server error' });
  }
};

exports.editUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, select: '-password' });
    if (!user) return res.status(404).send({ error: 'User not found' });
    return res.status(200).send({ user });
  } catch (err) {
    return res.status(500).send({ error: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ error: 'User not found' });
    return res.status(200).send({ message: 'User deleted' });
  } catch (err) {
    return res.status(500).send({ error: 'Server error' });
  }
};