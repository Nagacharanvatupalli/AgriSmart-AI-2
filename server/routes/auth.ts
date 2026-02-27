import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import User from '../models/User';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

// ─── In-Memory OTP Store ─────────────────────────────────────────────────────
interface OtpEntry {
  otp: string;
  expiresAt: Date;
}
const emailOtpStore = new Map<string, OtpEntry>();
const mobileOtpStore = new Map<string, OtpEntry>();

// ─── Twilio Client ──────────────────────────────────────────────────────────
function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  console.log(`[Twilio Debug] SID length: ${accountSid?.length || 0}`);

  if (!accountSid || accountSid === 'your_twilio_sid') {
    throw new Error(`Twilio Account SID is missing or invalid (current: ${accountSid})`);
  }
  if (!authToken) {
    throw new Error('Twilio Auth Token is missing');
  }

  return twilio(accountSid, authToken);
}

// ─── Nodemailer Transporter ───────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[AUTH ROUTER] ${req.method} ${req.path}`);
  next();
});

router.post('/register', async (req, res) => {
  try {
    console.log('--- REGISTER ATTEMPT ---');
    console.log('Body:', JSON.stringify({ ...req.body, password: '***' }, null, 2));

    const { mobile, email, profile, location, crops } = req.body;

    // Validation - At least one identifier is required
    if (!mobile && !email) {
      return res.status(400).json({ message: 'At least a Mobile number or Email is required' });
    }

    // New mandatory fields validation (remains same)
    if (!profile?.firstName || !profile?.lastName || !profile?.age) {
      return res.status(400).json({ message: 'Profile details (First Name, Last Name, Age) are mandatory' });
    }
    if (!location?.state || !location?.district || !location?.mandal) {
      return res.status(400).json({ message: 'Location details (State, District, Mandal) are mandatory' });
    }

    // Duplicate check
    if (mobile) {
      const existingMobile = await User.findOne({ mobile });
      if (existingMobile) return res.status(400).json({ message: 'Mobile number already registered' });
    }
    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) return res.status(400).json({ message: 'Email address already registered' });
    }

    const newUser = new User({
      mobile: mobile || undefined,
      email: email || undefined,
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
    let { mobile, otp } = req.body;
    console.log('Mobile:', mobile, 'OTP:', otp);

    if (!mobile || !otp) {
      return res.status(400).json({ message: 'Mobile and OTP are required' });
    }

    // Normalize number for consistency
    const digits = mobile.replace(/\D/g, '');
    if (!mobile.startsWith('+')) {
      if (digits.length === 10) mobile = `+91${digits}`;
      else mobile = `+${digits}`;
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      console.log('User not found:', mobile);
      return res.status(400).json({ message: 'No account found with this mobile number. Please register.' });
    }

    // Verify OTP
    const entry = mobileOtpStore.get(mobile);
    if (!entry) {
      return res.status(400).json({ message: 'No OTP found for this number. Request a new one.' });
    }
    if (new Date() > entry.expiresAt) {
      mobileOtpStore.delete(mobile);
      return res.status(400).json({ message: 'OTP has expired.' });
    }
    if (entry.otp !== otp.toString().trim()) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Success - Clear OTP and generate token
    mobileOtpStore.delete(mobile);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    console.log('User logged in via OTP:', user._id);

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

// ─── Send Email OTP ──────────────────────────────────────────────────────────
router.post('/send-email-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS ||
      process.env.EMAIL_USER === 'your_email@gmail.com') {
      return res.status(500).json({ message: 'Email service is not configured. Please set EMAIL_USER and EMAIL_PASS in .env' });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    emailOtpStore.set(email.toLowerCase(), { otp, expiresAt });
    console.log(`[OTP] Generated OTP ${otp} for email ${email}, expires at ${expiresAt}`);

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"AgriSmart AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🌿 Your AgriSmart AI Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#f0fdf4;font-family:'Segoe UI',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                    <tr>
                      <td style="background:linear-gradient(135deg,#16a34a,#22c55e);padding:36px 40px;text-align:center;">
                        <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">🌿 AgriSmart AI</h1>
                        <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Email Verification</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:40px;">
                        <p style="margin:0 0 8px;color:#374151;font-size:16px;font-weight:600;">Hello Farmer! 👋</p>
                        <p style="margin:0 0 32px;color:#6b7280;font-size:14px;line-height:1.6;">
                          Use the verification code below to complete your registration. This code is valid for <strong>10 minutes</strong>.
                        </p>
                        <div style="background:#f0fdf4;border:2px dashed #86efac;border-radius:16px;padding:28px;text-align:center;margin-bottom:32px;">
                          <p style="margin:0 0 8px;color:#16a34a;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Your OTP Code</p>
                          <p style="margin:0;color:#166534;font-size:42px;font-weight:900;letter-spacing:12px;font-family:monospace;">${otp}</p>
                        </div>
                        <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
                          If you didn't request this, you can safely ignore this email.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #f3f4f6;">
                        <p style="margin:0;color:#9ca3af;font-size:12px;">© 2025 AgriSmart AI · Empowering Farmers with Technology</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    console.log(`[OTP] Email sent successfully to ${email}`);
    res.json({ message: 'OTP sent to your email address' });
  } catch (error) {
    console.error('[OTP] Send email OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP email. Please try again.' });
  }
});

// ─── Verify Email OTP ─────────────────────────────────────────────────────────
router.post('/verify-email-otp', async (req, res) => {
  try {
    console.log('[OTP] Verification attempt:', req.body);
    const { email, otp } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Valid email is required' });
    }
    if (!otp) {
      return res.status(400).json({ message: 'OTP is required' });
    }

    const emailKey = email.toLowerCase().trim();
    const entry = emailOtpStore.get(emailKey);

    if (!entry) {
      console.log(`[OTP] No entry found for ${emailKey}`);
      return res.status(400).json({ message: 'No OTP found for this email. Please request a new one.' });
    }

    if (new Date() > entry.expiresAt) {
      emailOtpStore.delete(emailKey);
      console.log(`[OTP] OTP expired for ${emailKey}`);
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    const submittedOtp = otp.toString().trim();
    if (entry.otp !== submittedOtp) {
      console.log(`[OTP] Mismatch for ${emailKey}: expected ${entry.otp}, got ${submittedOtp}`);
      return res.status(400).json({ message: 'Invalid OTP. Please check and try again.' });
    }

    emailOtpStore.delete(emailKey);
    console.log(`[OTP] Email verified successfully for ${emailKey}`);
    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('[OTP] Verify email OTP error:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
});


// ─── Send Mobile OTP (Twilio) ───────────────────────────────────────────────
router.post('/send-mobile-otp', async (req, res) => {
  try {
    let { mobile } = req.body;
    if (!mobile) return res.status(400).json({ message: 'Mobile number is required' });

    // Normalize number: If it's 10 digits, assume +91. If it starts with 91, ensure + is there.
    const digits = mobile.replace(/\D/g, '');
    if (!mobile.startsWith('+')) {
      if (digits.length === 10) {
        mobile = `+91${digits}`;
      } else if (digits.length === 12 && digits.startsWith('91')) {
        mobile = `+${digits}`;
      } else {
        // Fallback for other formats, try as is or assume + prefix
        mobile = `+${digits}`;
      }
    }

    console.log(`[Twilio] Validating and sending OTP to ${mobile}...`);

    // 1. Validate number with Twilio Lookup V2
    try {
      const client = getTwilioClient();
      const lookup = await client.lookups.v2.phoneNumbers(mobile).fetch();
      if (!lookup.valid) {
        return res.status(400).json({ message: 'The provided phone number is invalid.' });
      }
    } catch (err) {
      console.error('[Twilio Lookup Error]', err);
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    mobileOtpStore.set(mobile, { otp, expiresAt });

    // 2. Send SMS
    try {
      const client = getTwilioClient();
      await client.messages.create({
        body: `Your AgriSmart AI verification code is: ${otp}. Valid for 10 minutes. 🌿`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: mobile
      });
    } catch (err) {
      console.error('[Twilio SMS Create Error]', err);
      return res.status(500).json({ message: 'Failed to send SMS. Check terminal for details.' });
    }

    console.log(`[Twilio] SMS OTP ${otp} sent to ${mobile}`);
    res.json({ message: 'OTP sent to your mobile number' });
  } catch (error) {
    console.error('[Twilio SMS Error]', error);
    res.status(500).json({ message: 'Failed to send SMS OTP. Please check your Twilio configuration.' });
  }
});

// ─── Verify Mobile OTP ──────────────────────────────────────────────────────
router.post('/verify-mobile-otp', async (req, res) => {
  try {
    let { mobile, otp } = req.body;
    if (!mobile || !otp) return res.status(400).json({ message: 'Mobile and OTP are required' });

    // Normalize number: If it's 10 digits, assume +91. If it starts with 91, ensure + is there.
    const digits = mobile.replace(/\D/g, '');
    if (!mobile.startsWith('+')) {
      if (digits.length === 10) {
        mobile = `+91${digits}`;
      } else if (digits.length === 12 && digits.startsWith('91')) {
        mobile = `+${digits}`;
      } else {
        mobile = `+${digits}`;
      }
    }

    const entry = mobileOtpStore.get(mobile);
    if (!entry) {
      return res.status(400).json({ message: 'No OTP found for this number. Request a new one.' });
    }

    if (new Date() > entry.expiresAt) {
      mobileOtpStore.delete(mobile);
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    if (entry.otp !== otp.toString().trim()) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    mobileOtpStore.delete(mobile);
    console.log(`[Twilio] Mobile verified: ${mobile}`);
    res.json({ success: true, message: 'Mobile verified successfully' });
  } catch (error) {
    console.error('[Twilio Verify Error]', error);
    res.status(500).json({ message: 'Server error during mobile verification' });
  }
});

export default router;

