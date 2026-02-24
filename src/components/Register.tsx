import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Phone, Lock, User, MapPin, Sprout, Calendar, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';

const locationData: any = {
    'Telangana': {
        'Hyderabad': ['Ameerpet', 'Banjara Hills', 'Gachibowli'],
        'Rangareddy': ['Rajendranagar', 'Serilingampally', 'Chevella'],
        'Warangal': ['Hanamkonda', 'Kazipet', 'Warangal City']
    },
    'Andhra Pradesh': {
        'Visakhapatnam': ['Gajuwaka', 'Pendurthi', 'Seethammadhara'],
        'Vijayawada': ['Gannavaram', 'Ibrahimpatnam', 'Penamaluru'],
        'Guntur': ['Amaravathi', 'Mangalagiri', 'Tenali']
    }
};

export default function Register({ onSwitch, onSuccess }: { onSwitch: () => void, onSuccess: (user: any) => void }) {
    const [phase, setPhase] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');

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
        cropStartDate: '',
        cropEndDate: '',
        soilReportImage: ''
    });

    const handleSendOtp = async () => {
        if (!formData.mobile || !formData.password) return setError('Mobile and password required');
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/send-otp', { mobile: formData.mobile });
            setShowOtpModal(true);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/verify-otp', { mobile: formData.mobile, otp });
            setShowOtpModal(false);
            setPhase(2);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/register', formData);
            onSuccess(formData);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData({ ...formData, soilReportImage: reader.result as string });
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="flex justify-between mb-8 px-2">
                {[1, 2, 3].map((p) => (
                    <div key={p} className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${phase >= p ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                            {phase > p ? <CheckCircle2 size={20} /> : p}
                        </div>
                        <span className={`text-[10px] uppercase tracking-widest font-bold ${phase >= p ? 'text-primary' : 'text-gray-400'}`}>
                            {p === 1 ? 'Security' : p === 2 ? 'Profile' : 'Location'}
                        </span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {phase === 1 && (
                    <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input type="tel" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} className="w-full bg-gray-50 border border-primary/20 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Enter 10 digit number" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full bg-gray-50 border border-primary/20 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Create a strong password" />
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button onClick={handleSendOtp} disabled={loading} className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" /> : 'Verify Mobile'}
                        </button>
                    </motion.div>
                )}

                {phase === 2 && (
                    <motion.div key="p2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">First Name</label>
                                <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-gray-50 border border-primary/20 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Last Name</label>
                                <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-gray-50 border border-primary/20 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Age</label>
                            <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full bg-gray-50 border border-primary/20 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <button onClick={() => setPhase(3)} className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all">
                            Next Step
                        </button>
                    </motion.div>
                )}

                {phase === 3 && (
                    <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="grid grid-cols-3 gap-3">
                            <select value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value, district: '', mandal: '' })} className="bg-gray-50 border border-primary/20 rounded-xl px-3 py-3 text-sm focus:outline-none">
                                <option value="">State</option>
                                {Object.keys(locationData).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <select value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value, mandal: '' })} disabled={!formData.state} className="bg-gray-50 border border-primary/20 rounded-xl px-3 py-3 text-sm focus:outline-none">
                                <option value="">District</option>
                                {formData.state && Object.keys(locationData[formData.state]).map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <select value={formData.mandal} onChange={(e) => setFormData({ ...formData, mandal: e.target.value })} disabled={!formData.district} className="bg-gray-50 border border-primary/20 rounded-xl px-3 py-3 text-sm focus:outline-none">
                                <option value="">Mandal</option>
                                {formData.district && locationData[formData.state][formData.district].map((m: string) => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="space-y-4 p-6 bg-primary/5 rounded-3xl border border-primary/10">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2"><Sprout size={14} /> Initial Crop Details</h4>
                            <input type="text" placeholder="Crop Name" value={formData.cropName} onChange={(e) => setFormData({ ...formData, cropName: e.target.value })} className="w-full bg-white border border-primary/20 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="date" value={formData.cropStartDate} onChange={(e) => setFormData({ ...formData, cropStartDate: e.target.value })} className="bg-white border border-primary/20 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                                <input type="date" value={formData.cropEndDate} onChange={(e) => setFormData({ ...formData, cropEndDate: e.target.value })} className="bg-white border border-primary/20 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                            </div>
                            <div className="relative">
                                <input type="file" onChange={handleImageUpload} className="hidden" id="soil-upload" accept="image/*" />
                                <label htmlFor="soil-upload" className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary text-sm cursor-pointer hover:bg-primary/5">
                                    <Upload size={16} /> {formData.soilReportImage ? 'Image Selected' : 'Upload Soil Report (Optional)'}
                                </label>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button onClick={handleRegister} disabled={loading} className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" /> : 'Complete Registration'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {showOtpModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-[40px] shadow-2xl w-full max-w-sm text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="text-primary" size={32} />
                        </div>
                        <h3 className="serif text-2xl mb-2">Verify OTP</h3>
                        <p className="text-gray-500 text-sm mb-8">We've sent a 6-digit code to your mobile number.</p>
                        <input type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full text-center text-3xl tracking-[0.5em] font-bold bg-gray-50 border border-primary/20 rounded-2xl py-4 mb-6 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="000000" />
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <div className="flex gap-3">
                            <button onClick={() => setShowOtpModal(false)} className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600">Cancel</button>
                            <button onClick={handleVerifyOtp} disabled={loading} className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all">
                                Verify
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
