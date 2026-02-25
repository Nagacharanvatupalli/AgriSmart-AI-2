import React from 'react';
import {
    Plus,
    User,
    CheckCircle2,
    MapPin,
    Leaf,
    Pencil,
    Calendar,
    TrendingUp,
    Droplets,
    CloudSun,
    ArrowUpRight,
    X,
    Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DashboardPageProps {
    userName: string;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    user: any;
    onUpdateProfile: (data: any) => Promise<boolean>;
    onAddCrop: (data: any) => Promise<boolean>;
    onSelectCrop: (cropId: string) => Promise<boolean>;
    isLoading?: boolean;
}

export default function DashboardPage({ userName, onImageUpload, fileInputRef, user, onUpdateProfile, onAddCrop, onSelectCrop, isLoading }: DashboardPageProps) {
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [editFormData, setEditFormData] = React.useState({
        firstName: '',
        lastName: '',
        state: '',
        district: '',
        mandal: '',
        cropName: '',
        startDate: '',
        endDate: ''
    });

    const [isSaving, setIsSaving] = React.useState(false);

    const [isAddCropModalOpen, setIsAddCropModalOpen] = React.useState(false);
    const [isMyCropsModalOpen, setIsMyCropsModalOpen] = React.useState(false);

    const [newCropData, setNewCropData] = React.useState({
        cropName: '',
        startDate: '',
        endDate: ''
    });

    const handleAddCrop = async () => {
        setIsSaving(true);
        const success = await onAddCrop(newCropData);
        if (success) {
            setIsAddCropModalOpen(false);
            setNewCropData({ cropName: '', startDate: '', endDate: '' });
        }
        setIsSaving(false);
    };

    const handleSelectCrop = async (cropId: string) => {
        setIsSaving(true);
        await onSelectCrop(cropId);
        setIsMyCropsModalOpen(false);
        setIsSaving(false);
    };

    React.useEffect(() => {
        if (user) {
            setEditFormData({
                firstName: user.profile?.firstName || '',
                lastName: user.profile?.lastName || '',
                state: user.location?.state || '',
                district: user.location?.district || '',
                mandal: user.location?.mandal || '',
                cropName: user.cropDetails?.cropName || '',
                startDate: user.cropDetails?.startDate ? new Date(user.cropDetails.startDate).toISOString().split('T')[0] : '',
                endDate: user.cropDetails?.endDate ? new Date(user.cropDetails.endDate).toISOString().split('T')[0] : ''
            });
        }
    }, [user, isEditModalOpen]);

    const handleSave = async () => {
        setIsSaving(true);
        const success = await onUpdateProfile({
            profile: { firstName: editFormData.firstName, lastName: editFormData.lastName },
            location: { state: editFormData.state, district: editFormData.district, mandal: editFormData.mandal },
            cropDetails: {
                cropName: editFormData.cropName,
                startDate: editFormData.startDate,
                endDate: editFormData.endDate
            }
        });
        if (success) {
            setIsEditModalOpen(false);
        }
        setIsSaving(false);
    };

    // Helper to calculate cycle progress
    const calculateProgress = (startDate: string | Date, endDate: string | Date) => {
        if (!startDate || !endDate) return "0%";
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const now = new Date().getTime();
        if (now < start) return "0%";
        if (now > end) return "100%";
        const total = end - start;
        const current = now - start;
        return `${Math.round((current / total) * 100)}%`;
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-gray-50/50 relative">
            {isLoading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 size={48} className="text-[#00ab55] animate-spin" />
                        <p className="text-[#00ab55] font-black text-[10px] uppercase tracking-widest">Gathering your farm data...</p>
                    </div>
                </div>
            )}
            <div className="max-w-[1600px] mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Farm Management</h1>
                        <p className="text-gray-400 mt-1 font-medium italic">Real-time overview of your agricultural assets.</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setIsAddCropModalOpen(true)} className="bg-[#00ab55] text-white font-black text-[10px] uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-[#00964a] transition-all shadow-lg shadow-[#00ab55]/20 flex items-center gap-2">
                            <Plus size={16} /> ADD NEW CROP
                        </button>
                        <button onClick={() => setIsMyCropsModalOpen(true)} className="bg-white text-[#00ab55] border-2 border-[#00ab55]/20 font-black text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-[#00ab55]/5 transition-all">
                            MY CROPS
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-4 rounded-[40px] bg-white p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center">
                        <div className="w-24 h-24 bg-[#00ab55]/10 rounded-3xl flex items-center justify-center mb-8">
                            <div className="w-16 h-16 bg-[#00ab55] rounded-2xl flex items-center justify-center">
                                <User size={32} className="text-white" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 text-center uppercase tracking-tight leading-tight max-w-[200px]">
                            {userName || 'FARMER NAME'}
                        </h2>

                        <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00ab55]/20 bg-[#00ab55]/5 text-[#00ab55] text-[10px] font-bold uppercase tracking-widest">
                            <CheckCircle2 size={12} /> VERIFIED FARMER
                        </div>

                        <div className="w-full mt-10 space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">LOCATION DETAILS</h3>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-300 uppercase">{user?.location?.state || 'Location Not Set'}</p>
                                    <p className="text-sm font-bold text-gray-700">
                                        {user?.location?.district || ''}{user?.location?.district && user?.location?.mandal ? ', ' : ''}{user?.location?.mandal || ''}
                                        {!user?.location?.district && !user?.location?.mandal && 'Details Not Set'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Leaf size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-300 uppercase">Primary Crop</p>
                                    <p className="text-sm font-bold text-gray-700">{user?.cropDetails?.cropName || 'Not Selected'}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="w-full mt-10 bg-[#161b22] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3"
                        >
                            <Pencil size={16} /> EDIT PROFILE
                        </button>
                    </div>

                    {/* Right Column: Stats and Info */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Top Stats Strip */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <DashboardStat
                                label="ACTIVE CROP"
                                value={user?.cropDetails?.cropName || "Paddy"}
                                icon={<Leaf className="text-green-500" size={24} />}
                            />
                            <DashboardStat
                                label="CYCLE PROGRESS"
                                value={calculateProgress(user?.cropDetails?.startDate, user?.cropDetails?.endDate)}
                                icon={<Calendar className="text-blue-500" size={24} />}
                            />
                            <DashboardStat
                                label="MARKET PRICE"
                                value="↑ 12%"
                                icon={<TrendingUp className="text-orange-500" size={24} />}
                            />
                            <DashboardStat
                                label="IRRIGATION"
                                value="Normal"
                                icon={<Droplets className="text-blue-400" size={24} />}
                            />
                        </div>

                        {/* Middle Row: Weather Feed and Recommendation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/50 border border-gray-100">
                                <header className="flex items-center gap-2 mb-8">
                                    <CloudSun className="text-[#00ab55]" size={20} />
                                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Daily Weather Feed</h3>
                                </header>

                                <div className="space-y-6">
                                    <WeatherRow label="Morning Temp" value="24°C" />
                                    <WeatherRow label="Humidity Levels" value="58%" />
                                    <WeatherRow label="Rain Prediction" value="Low (5%)" highlighted />
                                </div>
                            </div>

                            <div className="bg-[#0a2635] rounded-[40px] p-8 shadow-xl shadow-gray-900/10 text-white flex flex-col justify-between relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ab55]/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#00ab55]/20 transition-all duration-500" />
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight mb-4">AI Recommendation</h3>
                                    <p className="text-white/70 text-sm leading-relaxed max-w-[280px]">
                                        Localized analysis for {user?.location?.district || 'your area'} shows stable soil conditions.
                                        Continue with the current {user?.cropDetails?.cropName || 'crop'} management plan for optimal growth.
                                    </p>
                                </div>

                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00ab55] hover:text-white transition-colors mt-8">
                                    ACCESS FULL AI LAB <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={onImageUpload} className="hidden" accept="image/*" />

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0a2635]/80 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden relative shadow-2xl"
                    >
                        <div className="p-10">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Edit Profile</h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={editFormData.firstName}
                                            onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={editFormData.lastName}
                                            onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">State</label>
                                    <input
                                        type="text"
                                        value={editFormData.state}
                                        onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">District</label>
                                        <input
                                            type="text"
                                            value={editFormData.district}
                                            onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Mandal / Town</label>
                                        <input
                                            type="text"
                                            value={editFormData.mandal}
                                            onChange={(e) => setEditFormData({ ...editFormData, mandal: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Primary Crop</label>
                                    <input
                                        type="text"
                                        value={editFormData.cropName}
                                        onChange={(e) => setEditFormData({ ...editFormData, cropName: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Sowing Date</label>
                                        <input
                                            type="date"
                                            value={editFormData.startDate}
                                            onChange={(e) => setEditFormData({ ...editFormData, startDate: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Harvest Date</label>
                                        <input
                                            type="date"
                                            value={editFormData.endDate}
                                            onChange={(e) => setEditFormData({ ...editFormData, endDate: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors"
                                >
                                    CANCEL
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-1 bg-[#00ab55] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00964a] transition-all shadow-lg shadow-[#00ab55]/20 flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : 'SAVE CHANGES'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* My Crops Modal */}
            {isMyCropsModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0a2635]/80 backdrop-blur-sm" onClick={() => setIsMyCropsModalOpen(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden relative shadow-2xl"
                    >
                        <div className="p-10">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">My Crops</h2>
                                <button onClick={() => setIsMyCropsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                {user?.crops?.map((crop: any) => (
                                    <div
                                        key={crop._id}
                                        onClick={() => handleSelectCrop(crop._id)}
                                        className={cn(
                                            "p-6 rounded-3xl border transition-all cursor-pointer group flex justify-between items-center",
                                            user.cropDetails.cropName === crop.cropName
                                                ? "bg-[#00ab55]/5 border-[#00ab55] ring-1 ring-[#00ab55]"
                                                : "bg-gray-50 border-gray-100 hover:border-[#00ab55]/30"
                                        )}
                                    >
                                        <div>
                                            <h4 className="font-bold text-gray-900 uppercase tracking-tight">{crop.cropName}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 mt-1">
                                                {new Date(crop.startDate).toLocaleDateString()} - {new Date(crop.endDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        {user.cropDetails.cropName === crop.cropName ? (
                                            <div className="w-8 h-8 rounded-full bg-[#00ab55] text-white flex items-center justify-center">
                                                <CheckCircle2 size={16} />
                                            </div>
                                        ) : (
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#00ab55] opacity-0 group-hover:opacity-100 transition-opacity">
                                                SELECT
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    setIsMyCropsModalOpen(false);
                                    setIsAddCropModalOpen(true);
                                }}
                                className="w-full mt-8 bg-gray-50 text-gray-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={16} /> ADD ANOTHER CROP
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Add Crop Modal */}
            {isAddCropModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0a2635]/80 backdrop-blur-sm" onClick={() => setIsAddCropModalOpen(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden relative shadow-2xl"
                    >
                        <div className="p-10">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Add New Crop</h2>
                                <button onClick={() => setIsAddCropModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Crop Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Paddy, Cotton, Maize"
                                        value={newCropData.cropName}
                                        onChange={(e) => setNewCropData({ ...newCropData, cropName: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Sowing Date</label>
                                        <input
                                            type="date"
                                            value={newCropData.startDate}
                                            onChange={(e) => setNewCropData({ ...newCropData, startDate: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Harvest Date</label>
                                        <input
                                            type="date"
                                            value={newCropData.endDate}
                                            onChange={(e) => setNewCropData({ ...newCropData, endDate: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <button
                                    onClick={() => setIsAddCropModalOpen(false)}
                                    className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors"
                                >
                                    CANCEL
                                </button>
                                <button
                                    onClick={handleAddCrop}
                                    disabled={isSaving || !newCropData.cropName}
                                    className="flex-1 bg-[#00ab55] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00964a] transition-all shadow-lg shadow-[#00ab55]/20 flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : 'ADD CROP'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function DashboardStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="bg-white rounded-[32px] p-6 shadow-md shadow-gray-200/50 border border-gray-100 flex flex-col items-center justify-between min-h-[160px] hover:scale-[1.02] transition-transform cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-[#00ab55]/5 transition-colors">
                {icon}
            </div>
            <div className="text-center mt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">{label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
        </div>
    );
}

function WeatherRow({ label, value, highlighted }: { label: string; value: string; highlighted?: boolean }) {
    return (
        <div className={cn(
            "flex justify-between items-center px-6 py-4 rounded-2xl transition-colors",
            highlighted ? "bg-blue-50 border border-blue-100 text-blue-600" : "bg-gray-50 text-gray-600"
        )}>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{label}</span>
            <span className="text-sm font-black">{value}</span>
        </div>
    );
}
