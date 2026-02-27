import React, { useState } from 'react';
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
  X
} from 'lucide-react';

import indiaLocations from '../data/india_locations.json';

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

  const [isLogin, setIsLogin] = useState(true);
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    state: '',
    district: '',
    mandal: '',
    cropName: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile, password: formData.password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);

        // Special Admin Redirection
        if (formData.mobile === '7893439082' && formData.password === 'charan123') {
          navigate('/admin-dashboard');
          return;
        }

        const firstName = data.user?.profile?.firstName || '';
        const lastName = data.user?.profile?.lastName || '';
        const fullName = [firstName, lastName].filter(Boolean).join(' ') || data.user?.mobile || '';
        const userLocation = data.user?.location ? `${data.user.location.mandal}, ${data.user.location.district}, ${data.user.location.state}` : '';

        localStorage.setItem('userName', fullName);
        localStorage.setItem('userLocation', userLocation);
        onAuthSuccess(fullName, data.user);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    console.log('Registration started...');
    console.log('Form Data:', formData);

    // Validation
    if (!formData.mobile || !formData.password) {
      alert('Mobile number and password are required');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (!formData.firstName || !formData.lastName) {
      alert('First name and last name are required');
      return;
    }

    if (!formData.state || !formData.district || !formData.mandal) {
      alert('Please select state, district, and mandal');
      return;
    }

    if (!formData.cropName) {
      alert('Please enter a crop name');
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      alert('Please select start and end dates');
      return;
    }

    try {
      console.log('Sending registration request...');
      const payload = {
        mobile: formData.mobile,
        password: formData.password,
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
        cropDetails: {
          cropName: formData.cropName,
          startDate: formData.startDate,
          endDate: formData.endDate,
          soilReportUrl: '',
        },
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
        alert('Registration successful! Please login with your credentials.');
        setIsLogin(true);
        setPhase(1);
        setFormData({
          mobile: '',
          password: '',
          firstName: '',
          lastName: '',
          age: '',
          state: '',
          district: '',
          mandal: '',
          cropName: '',
          startDate: '',
          endDate: '',
        });
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
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
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-white/60 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50" />
                  Remember Me
                </label>
                <button type="button" className="text-primary font-bold hover:underline">Forgot Password?</button>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20"
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
              <button onClick={() => setIsLogin(true)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
              {[1, 2, 3].map((s) => (
                <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${phase >= s ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/10 text-white/30'}`}>
                    {phase > s ? <CheckCircle2 size={20} /> : s}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${phase >= s ? 'text-white' : 'text-white/30'}`}>
                    {s === 1 ? 'Account' : s === 2 ? 'Profile' : 'Agriculture'}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {phase === 1 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Mobile Number</label>
                    <div className="relative">
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
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Create Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Choose a strong password"
                      />
                    </div>
                  </div>
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
                        setFormData(prev => ({ ...prev, state: val, district: '', mandal: '' }));
                      }}
                      options={LOCATION_DATA.map(s => s.name)}
                      placeholder="Select State"
                    />
                    <SearchableSelect
                      label="District"
                      value={formData.district}
                      onChange={(val) => {
                        setFormData(prev => ({ ...prev, district: val, mandal: '' }));
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

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Crop Name</label>
                    <div className="relative">
                      <Sprout className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="cropName"
                        value={formData.cropName}
                        onChange={handleInputChange}
                        className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="e.g. Paddy, Cotton"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full bg-white rounded-2xl py-4 px-4 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/80 ml-1">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full bg-white rounded-2xl py-4 px-4 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
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
                    if (phase < 3) {
                      setPhase(phase + 1);
                    } else {
                      console.log('Complete Registration button clicked');
                      handleRegister();
                    }
                  }}
                  className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                >
                  {phase === 3 ? 'Complete Registration' : 'Next Step'}
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
