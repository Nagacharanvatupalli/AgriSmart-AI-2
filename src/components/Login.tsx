import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Lock, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function Login({ onSwitch, onSuccess }: { onSwitch: () => void, onSuccess: (user: any) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ mobile: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/login', formData);
      onSuccess(res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid mobile or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="space-y-6" onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="tel" required value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} className="w-full bg-gray-50 border border-primary/20 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Enter your mobile" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full bg-gray-50 border border-primary/20 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Enter your password" />
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : 'Login to Dashboard'}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-8">
        Don't have an account? <button onClick={onSwitch} className="text-primary font-bold hover:underline">Register Now</button>
      </p>
    </div>
  );
}
