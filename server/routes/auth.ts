import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log('Register request received:', req.body);

    const { mobile, password, profile, location, cropDetails } = req.body;

    // Validation
    if (!mobile || !password) {
      console.log('Missing mobile or password');
      return res.status(400).json({ message: 'Mobile and password are required' });
    }

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      console.log('User already exists:', mobile);
      return res.status(400).json({ message: 'User already exists with this mobile number' });
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      mobile,
      password: hashedPassword,
      profile: profile || {},
      location: location || {},
      cropDetails: cropDetails || {}
    });

    console.log('Saving user to database...');
    const savedUser = await newUser.save();
    console.log('User registered successfully:', savedUser._id);

    res.status(201).json({
      message: 'User registered successfully',
      userId: savedUser._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ message: 'Mobile and password are required' });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    console.log('User logged in:', user._id);

    res.json({
      token,
      user: {
        id: user._id,
        mobile: user.mobile,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;
