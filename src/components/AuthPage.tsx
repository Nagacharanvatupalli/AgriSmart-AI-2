import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Lock,
  User,
  Calendar,
  MapPin,
  Sprout,
  Upload,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Search,
  CheckCircle2,
  ArrowRight,
  X,
  Mail
} from 'lucide-react';

import indiaLocations from '../data/india_locations.json';
import { getTopCropsForLocation } from '../data/crops_by_location';
import CropDropdown from './CropDropdown';
import { useToast } from './ToastProvider';

// Create a type for the location data structure based on the JSON
interface District {
  name: string;
  blockList: string[];
}
interface StateData {
  name: string;
  districtList: District[];
}

const LOCATION_DATA = indiaLocations as StateData[];

const SearchableSelect = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = "Select..."
}: {
  label: string,
  value: string,
  onChange: (val: string) => void,
  options: string[],
  disabled?: boolean,
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">{label}</label>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full bg-white rounded-2xl py-4 px-4 text-gray-800 font-medium flex justify-between items-center transition-all cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:ring-2 hover:ring-primary/50'}`}
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>{value || placeholder}</span>
        <ChevronDown size={20} className="text-black" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="p-2 border-b border-gray-100 flex items-center gap-2">
              <Search size={16} className="text-gray-400 ml-2" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full py-2 px-2 text-sm text-gray-800 focus:outline-none bg-transparent"
              />
            </div>
            <div className="max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`py-3 px-4 text-gray-800 cursor-pointer hover:bg-primary/10 transition-colors ${value === opt ? 'bg-primary/5 font-bold' : ''}`}
                  >
                    {opt}
                  </div>
                ))
              ) : (
                <div className="py-3 px-4 text-gray-400 text-sm text-center">No results found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AuthPage({ onAuthSuccess }: { onAuthSuccess: (name?: string, user?: any) => void }) {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [phase, setPhase] = useState(1);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [isVerifyingMobileOtp, setIsVerifyingMobileOtp] = useState(false);
  const [isSendingMobileOtp, setIsSendingMobileOtp] = useState(false);
  const [loginOtpSent, setLoginOtpSent] = useState(false);
  const [isSendingLoginOtp, setIsSendingLoginOtp] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    mobileOtp: '',
    emailOtp: '',
    firstName: '',
    lastName: '',
    age: '',
    state: '',
    district: '',
    mandal: '',
    selectedCrops: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.mobileOtp.length === 6 && !mobileOtpVerified && !isVerifyingMobileOtp && !isLogin) {
      handleVerifyMobileOtp();
    }
    // Auto-verify login OTP
    if (formData.mobileOtp.length === 6 && isLogin && loginOtpSent) {
      handleLogin(new Event('submit') as any);
    }
  }, [formData.mobileOtp]);

  useEffect(() => {
    if (formData.emailOtp.length === 6 && !emailOtpVerified && !isVerifyingEmailOtp) {
      handleVerifyEmailOtp();
    }
  }, [formData.emailOtp]);

  const handleAddCrop = (crop: string) => {
    if (!formData.selectedCrops.includes(crop)) {
      setFormData(prev => ({
        ...prev,
        selectedCrops: [...prev.selectedCrops, crop]
      }));
    }
  };

  const handleRemoveCrop = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCrops: prev.selectedCrops.filter(c => c !== crop)
    }));
  };

  const handleSendMobileOtp = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!formData.mobile || formData.mobile.length < 10) {
      addToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setIsSendingMobileOtp(true);
    try {
      const response = await fetch('/api/auth/send-mobile-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile }),
      });
      let data: any = {};
      try { data = await response.json(); } catch { }
      if (response.ok) {
        setMobileOtpSent(true);
        addToast(data.message || 'OTP sent to your mobile number', 'success');
      } else {
        addToast(data.message || 'Failed to send SMS OTP. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Send mobile OTP error:', error);
      addToast('Network error. Please check your connection.', 'error');
    } finally {
      setIsSendingMobileOtp(false);
    }
  };

  const handleVerifyMobileOtp = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!formData.mobileOtp || formData.mobileOtp.length < 4) {
      addToast('Please enter the OTP sent to your phone', 'error');
      return;
    }
    setIsVerifyingMobileOtp(true);
    try {
      const response = await fetch('/api/auth/verify-mobile-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile, otp: formData.mobileOtp }),
      });
      let data: any = {};
      try { data = await response.json(); } catch { }
      if (response.ok && data.success) {
        setMobileOtpVerified(true);
        addToast('Mobile number verified successfully! ✅', 'success');
      } else {
        addToast(data.message || 'Invalid OTP. Please check and try again.', 'error');
      }
    } catch (error) {
      console.error('Verify mobile OTP error:', error);
      addToast('Network error during verification.', 'error');
    } finally {
      setIsVerifyingMobileOtp(false);
    }
  };

  const handleSendEmailOtp = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!formData.email || !formData.email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSendingEmailOtp(true);
    try {
      const response = await fetch('/api/auth/send-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      let data: any = {};
      try { data = await response.json(); } catch { /* non-JSON body */ }
      if (response.ok) {
        setEmailOtpSent(true);
        addToast(data.message || 'OTP sent to your email', 'success');
      } else {
        addToast(data.message || 'Failed to send OTP. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Send email OTP error:', error);
      addToast('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const handleVerifyEmailOtp = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!formData.emailOtp || formData.emailOtp.length < 6) {
      addToast('Please enter the 6-digit OTP sent to your email', 'error');
      return;
    }
    setIsVerifyingEmailOtp(true);
    try {
      const response = await fetch('/api/auth/verify-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.emailOtp }),
      });
      let data: any = {};
      try { data = await response.json(); } catch { /* non-JSON body */ }
      if (response.ok && data.success) {
        setEmailOtpVerified(true);
        addToast('Email verified successfully! ✅', 'success');
      } else {
        addToast(data.message || 'Invalid OTP. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Verify email OTP error:', error);
      addToast('Network error. Please check your connection and try again.', 'error');
    } finally {
      setIsVerifyingEmailOtp(false);
    }
  };


  const handleSendLoginOtp = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!formData.mobile || formData.mobile.length < 10) {
      addToast('Please enter a valid mobile number', 'error');
      return;
    }
    setIsSendingLoginOtp(true);
    try {
      const response = await fetch('/api/auth/send-mobile-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile }),
      });
      let data: any = {};
      try { data = await response.json(); } catch { }
      if (response.ok) {
        setLoginOtpSent(true);
        addToast('Login OTP sent to your mobile', 'success');
      } else {
        addToast(data.message || 'Failed to send login OTP', 'error');
      }
    } catch (error) {
      console.error('Send login OTP error:', error);
      addToast('Network error', 'error');
    } finally {
      setIsSendingLoginOtp(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mobile || !formData.mobileOtp) {
      addToast('Mobile and OTP are required', 'error');
      return;
    }
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile, otp: formData.mobileOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);

        // Special Admin Redirection (updated for OTP logic)
        if (formData.mobile === '7893439082' && formData.mobileOtp === '123456') {
          // Optional: Handle hardcoded debug OTP if needed, otherwise normal flow
        }

        const firstName = data.user?.profile?.firstName || '';
        const lastName = data.user?.profile?.lastName || '';
        const fullName = [firstName, lastName].filter(Boolean).join(' ') || data.user?.mobile || '';
        const userLocation = data.user?.location ? `${data.user.location.mandal}, ${data.user.location.district}, ${data.user.location.state}` : '';

        localStorage.setItem('userName', fullName);
        localStorage.setItem('userLocation', userLocation);
        onAuthSuccess(fullName, data.user);
      } else {
        addToast(data.message || 'Login failed. Invalid OTP or number.', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      addToast('An error occurred during login.', 'error');
    }
  };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    console.log('Registration started...');
    console.log('Form Data:', formData);

    // Validation
    if (!formData.mobile && !formData.email) {
      addToast('Mobile number or Email is required', 'error');
      return;
    }

    if (!mobileOtpVerified && !emailOtpVerified) {
      addToast('Please verify either your mobile number or email before registering', 'error');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.age) {
      addToast('First name, last name, and age are required', 'error');
      return;
    }

    if (!formData.state || !formData.district || !formData.mandal) {
      addToast('Please select state, district, and mandal', 'error');
      return;
    }

    if (formData.selectedCrops.length === 0) {
      addToast('Please select at least one crop', 'error');
      return;
    }

    try {
      console.log('Sending registration request...');
      const payload = {
        mobile: formData.mobile,
        email: formData.email,
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: parseInt(formData.age) || 0,
        },
        location: {
          state: formData.state,
          district: formData.district,
          mandal: formData.mandal,
        },
        crops: formData.selectedCrops.map(cropName => ({
          cropName,
          addedAt: new Date()
        })),
      };

      console.log('Payload:', payload);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setIsRegistrationSuccess(true);
        addToast('Registration successful!', 'success');

        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          const firstName = data.user.profile?.firstName || '';
          const lastName = data.user.profile?.lastName || '';
          const fullName = [firstName, lastName].filter(Boolean).join(' ') || data.user.mobile || data.user.email || '';
          const userLocation = data.user.location ? `${data.user.location.mandal}, ${data.user.location.district}, ${data.user.location.state}` : '';

          localStorage.setItem('userName', fullName);
          localStorage.setItem('userLocation', userLocation);

          setTimeout(() => {
            onAuthSuccess(fullName, data.user);
          }, 1500);
        } else {
          setTimeout(() => {
            setIsRegistrationSuccess(false);
            setIsLogin(true);
            setPhase(1);
            setMobileOtpSent(false);
            setMobileOtpVerified(false);
            setEmailOtpSent(false);
            setEmailOtpVerified(false);
            setFormData({
              mobile: '',
              email: '',
              mobileOtp: '',
              emailOtp: '',
              firstName: '',
              lastName: '',
              age: '',
              state: '',
              district: '',
              mandal: '',
              selectedCrops: [],
            });
          }, 1500);
        }
      } else {
        addToast(data.message || 'Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      addToast('An error occurred during registration. Please try again.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-cover bg-center px-4 py-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920")' }}>
      <button
        onClick={() => navigate('/')}
        className="absolute left-6 top-6 z-20 text-sm text-white/80 bg-black/20 px-3 py-2 rounded-lg hover:bg-black/30 transition-colors"
      >
        Back to Home
      </button>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-[40px] p-8 md:p-12 shadow-2xl max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                <Sprout className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
              <p className="text-white/60 mt-2">Login to manage your farm</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Mobile Number</label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendLoginOtp}
                    disabled={isSendingLoginOtp}
                    className="px-6 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all disabled:opacity-60 whitespace-nowrap"
                  >
                    {isSendingLoginOtp ? 'Sending…' : loginOtpSent ? 'Resend' : 'Send OTP'}
                  </button>
                </div>
              </div>

              {loginOtpSent && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Enter OTP</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="mobileOtp"
                      value={formData.mobileOtp}
                      onChange={handleInputChange}
                      maxLength={6}
                      className="w-full bg-white rounded-2xl py-4 px-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-center"
                      placeholder="000000"
                    />
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={!loginOtpSent}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20 disabled:opacity-60"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-white/60 mt-10">
              Don't have an account?
              <button onClick={() => setIsLogin(false)} className="text-primary font-bold ml-2 hover:underline">Create Account</button>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-[40px] p-8 md:p-12 shadow-2xl max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {isRegistrationSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-8 min-h-[400px]">
                <motion.div
                  initial={{ opacity: 0.2, scale: 0.8, filter: "grayscale(100%)" }}
                  animate={{ opacity: 1, scale: 1.2, filter: "grayscale(0%)" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)] relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute -top-2 -right-2 bg-white text-primary rounded-full p-1 shadow-lg"
                  >
                    <CheckCircle2 size={24} className="fill-white" />
                  </motion.div>
                  <Sprout className="text-primary" size={64} />
                </motion.div>
                <div className="text-center space-y-3">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-3xl font-bold text-white tracking-tight"
                  >
                    Registration<br />Successful!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-white/60 text-sm"
                  >
                    Your account is now growing with us.
                  </motion.p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                      <Sprout className="text-white" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Register</h2>
                      <p className="text-white/50 text-xs">Join AgriSmart AI today</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setIsLogin(true)} className="text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-12 relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${phase >= s ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/10 text-white/30'}`}>
                        {(s === 1 && mobileOtpVerified) || (phase > s) ? <CheckCircle2 size={20} /> : s}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${phase >= s ? 'text-white' : 'text-white/30'}`}>
                        {s === 1 ? 'Verify' : s === 2 ? 'Profile' : 'Crops'}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                  {phase === 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      {/* Mobile Number Section */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Mobile Number</label>
                        <div className="flex gap-3 mt-2">
                          <div className="flex-1 relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="tel"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleInputChange}
                              disabled={mobileOtpVerified}
                              className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-60"
                              placeholder="Enter mobile number"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleSendMobileOtp}
                            disabled={mobileOtpVerified || isSendingMobileOtp}
                            className="px-6 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all disabled:opacity-60 whitespace-nowrap"
                          >
                            {isSendingMobileOtp ? 'Sending…' : mobileOtpVerified ? 'Verified ✓' : mobileOtpSent ? 'Resend OTP' : 'Send OTP'}
                          </button>
                        </div>
                      </div>

                      {/* Mobile OTP Verification */}
                      {mobileOtpSent && !mobileOtpVerified && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Enter OTP (Mobile)</label>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              name="mobileOtp"
                              value={formData.mobileOtp}
                              onChange={handleInputChange}
                              maxLength={6}
                              className="flex-1 bg-white rounded-2xl py-4 px-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-center"
                              placeholder="000000"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyMobileOtp}
                              disabled={isVerifyingMobileOtp}
                              className="px-6 py-4 bg-green-500 text-white rounded-2xl font-bold text-sm hover:bg-green-600 transition-all disabled:opacity-60 whitespace-nowrap"
                            >
                              {isVerifyingMobileOtp ? 'Verifying…' : 'Verify'}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Email Section */}
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Email Address</label>
                        <div className="flex gap-3 mt-2">
                          <div className="flex-1 relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={emailOtpVerified}
                              className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-60"
                              placeholder="Enter email address"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleSendEmailOtp}
                            disabled={emailOtpVerified || isSendingEmailOtp}
                            className="px-6 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all disabled:opacity-60 whitespace-nowrap"
                          >
                            {isSendingEmailOtp ? 'Sending…' : emailOtpVerified ? 'Verified ✓' : emailOtpSent ? 'Resend OTP' : 'Send OTP'}
                          </button>
                        </div>
                      </div>

                      {/* Email OTP Verification */}
                      {emailOtpSent && !emailOtpVerified && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Enter OTP (Email)</label>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              name="emailOtp"
                              value={formData.emailOtp}
                              onChange={handleInputChange}
                              maxLength={6}
                              className="flex-1 bg-white rounded-2xl py-4 px-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-center"
                              placeholder="000000"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyEmailOtp}
                              disabled={isVerifyingEmailOtp}
                              className="px-6 py-4 bg-green-500 text-white rounded-2xl font-bold text-sm hover:bg-green-600 transition-all disabled:opacity-60 whitespace-nowrap"
                            >
                              {isVerifyingEmailOtp ? 'Verifying…' : 'Verify'}
                            </button>
                          </div>
                        </motion.div>
                      )}

                    </motion.div>
                  )}

                  {phase === 2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">First Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Age</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="Enter your age"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {phase === 3 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="space-y-4">
                        <SearchableSelect
                          label="State"
                          value={formData.state}
                          onChange={(val) => {
                            setFormData(prev => ({ ...prev, state: val, district: '', mandal: '', selectedCrops: [] }));
                          }}
                          options={LOCATION_DATA.map(s => s.name)}
                          placeholder="Select State"
                        />
                        <SearchableSelect
                          label="District"
                          value={formData.district}
                          onChange={(val) => {
                            setFormData(prev => ({ ...prev, district: val, mandal: '', selectedCrops: [] }));
                          }}
                          options={formData.state ? (LOCATION_DATA.find(s => s.name === formData.state)?.districtList.map(d => d.name) || []) : []}
                          disabled={!formData.state}
                          placeholder="Select District"
                        />
                        <SearchableSelect
                          label="Mandal"
                          value={formData.mandal}
                          onChange={(val) => {
                            setFormData(prev => ({ ...prev, mandal: val }));
                          }}
                          options={
                            (formData.state && formData.district)
                              ? (LOCATION_DATA.find(s => s.name === formData.state)?.districtList.find(d => d.name === formData.district)?.blockList || [])
                              : []
                          }
                          disabled={!formData.district}
                          placeholder="Select Mandal"
                        />
                      </div>

                      {/* Multi-Crop Selection */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Select Crops (Multiple)</label>

                        <CropDropdown
                          value=""
                          onChange={handleAddCrop}
                          selectedCrops={formData.selectedCrops}
                          topCrops={getTopCropsForLocation(formData.state, formData.district)}
                          placeholder="Search and select crops..."
                        />

                        {/* Selected Crops Display */}
                        {formData.selectedCrops.length > 0 && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-2xl p-5 space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="text-white/90 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <Sprout size={16} className="text-primary" />
                                Selected Crops ({formData.selectedCrops.length})
                              </p>
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, selectedCrops: [] }))}
                                className="text-white/60 hover:text-white transition-colors text-xs font-semibold"
                              >
                                Clear All
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {formData.selectedCrops.map((crop, index) => (
                                <motion.div
                                  key={`${crop}-${index}`}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                  className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2.5 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all group"
                                >
                                  <Sprout size={16} className="group-hover:rotate-12 transition-transform" />
                                  <span>{crop}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveCrop(crop)}
                                    className="ml-1 hover:bg-white/20 rounded-full p-1 transition-all transform hover:scale-110"
                                  >
                                    <X size={16} />
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Empty State Message */}
                        {formData.selectedCrops.length === 0 && (
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <p className="text-white/60 text-sm">No crops selected yet. Choose from the list above to get started.</p>
                          </div>
                        )}
                      </div>

                    </motion.div>
                  )}

                  <div className="flex gap-4 pt-6">
                    {phase > 1 && (
                      <button
                        type="button"
                        onClick={() => setPhase(phase - 1)}
                        className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                      >
                        <ChevronLeft size={20} />
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (phase === 1) {
                          if (!mobileOtpVerified && !emailOtpVerified) {
                            addToast('Please verify either mobile or email before proceeding', 'error');
                            return;
                          }
                          setPhase(2);
                        } else if (phase === 2) {
                          if (!formData.firstName || !formData.lastName || !formData.age) {
                            addToast('Please fill in all profile fields', 'error');
                            return;
                          }
                          setPhase(3);
                        } else if (phase === 3) {
                          if (!formData.state || !formData.district || !formData.mandal || formData.selectedCrops.length === 0) {
                            addToast('Please select all location and at least one crop', 'error');
                            return;
                          }
                          console.log('Complete Registration button clicked');
                          handleRegister();
                        }
                      }}
                      className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-60"
                      disabled={phase === 1 && !mobileOtpVerified && !emailOtpVerified}
                    >
                      {phase === 3 ? 'Complete Registration' : 'Next Step'}
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
