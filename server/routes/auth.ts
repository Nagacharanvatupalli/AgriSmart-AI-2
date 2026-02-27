import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[AUTH ROUTER] ${req.method} ${req.path}`);
  next();
});

router.post('/register', async (req, res) => {
  try {
    console.log('--- REGISTER ATTEMPT ---');
    console.log('Body:', JSON.stringify({ ...req.body, password: '***' }, null, 2));

    const { mobile, email, password, profile, location, crops } = req.body;

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
      email: email || '',
      password: hashedPassword,
      profile: profile || {},
      location: location || {},
      crops: crops || []
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
    console.log('--- LOGIN ATTEMPT ---');
    const { mobile, password } = req.body;
    console.log('Mobile:', mobile);

    if (!mobile || !password) {
      return res.status(400).json({ message: 'Mobile and password are required' });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      console.log('User not found:', mobile);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', mobile);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    console.log('User logged in:', user._id);

    res.json({
      token,
      user: {
        id: user._id,
        mobile: user.mobile,
        email: user.email,
        profile: user.profile,
        location: user.location,
        crops: user.crops
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get user profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
  try {
    console.log('--- FETCH PROFILE ---');
    console.log('User ID:', req.userId);
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      console.log('User not found for ID:', req.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Found user:', user.mobile);
    res.json(user);
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req: AuthRequest, res) => {
  try {
    console.log('--- UPDATE PROFILE ATTEMPT ---');
    console.log('User ID:', req.userId);
    console.log('Payload:', JSON.stringify(req.body, null, 2));

    const { profile, location, crops } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      console.log('User not found for update:', req.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    if (profile) {
      console.log('Updating profile details...');
      Object.assign(user.profile, profile);
    }
    if (location) {
      console.log('Updating location details...');
      Object.assign(user.location, location);
    }
    if (crops) {
      console.log('Updating crops...');
      user.crops = crops;
    }

    await user.save();
    console.log('Profile updated successfully for:', user.mobile);
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

// Add a new crop
router.post('/crops', authMiddleware, async (req: AuthRequest, res) => {
  try {
    console.log('--- ADD CROP ATTEMPT ---');
    console.log('User ID:', req.userId);
    console.log('Payload:', req.body);
    const { cropName } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.crops) {
      user.crops = [];
    }

    const newCrop = { cropName, addedAt: new Date() };
    user.crops.push(newCrop);
    await user.save();

    res.json({ message: 'Crop added successfully', user });
  } catch (error) {
    console.error('Add crop error:', error);
    res.status(500).json({ message: 'Server error adding crop' });
  }
});

// Delete a crop
router.delete('/crops/:cropId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    console.log('--- DELETE CROP ATTEMPT ---');
    console.log('User ID:', req.userId);
    const { cropId } = req.params;
    console.log('Crop Index to delete:', cropId);
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.crops || !Array.isArray(user.crops)) {
      return res.status(404).json({ message: 'No crops found for this user' });
    }

    const cropIndex = parseInt(cropId);
    if (cropIndex < 0 || cropIndex >= user.crops.length) {
      return res.status(404).json({ message: 'Crop not found in your list' });
    }

    user.crops.splice(cropIndex, 1);
    await user.save();
    res.json({ message: 'Crop deleted successfully', user });
  } catch (error) {
    console.error('Delete crop error:', error);
    res.status(500).json({ message: 'Server error deleting crop' });
  }
});

export default router;
