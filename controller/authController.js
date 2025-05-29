const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

exports.register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(401).send('Invalid credentials');
  res.json({ token: generateToken(user._id) });
};
