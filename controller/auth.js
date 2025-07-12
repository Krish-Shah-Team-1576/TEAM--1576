const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    res.status(201).json({ 
      user: { id: user._id, username: user.username, email: user.email, points: user.points },
      accessToken: token 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    res.json({ 
      user: { id: user._id, username: user.username, email: user.email, points: user.points },
      accessToken: token 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};