import React, { useState, useEffect } from 'react';
import {
    Users,
    MapPin,
    CloudRain,
    ThermometerSun,
    MessageSquare,
    RefreshCw,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

interface Result {
    mobile: string;
    location: string;
    weather: {
        temp: number;
        rainProb: number;
    };
    status: string;
}

export default function AdminDashboard() {
    const [results, setResults] = useState<Result[]>([]);
    const [lastCheck, setLastCheck] = useState<Date | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const checkWeather = async () => {
        setIsChecking(true);
        try {
            const resp = await fetch('/api/admin/check-weather', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await resp.json();
            if (data.success) {
                setResults(data.results);
                setLastCheck(new Date());
            }
        } catch (err) {
            console.error('Check failed:', err);
        } finally {
            setIsChecking(false);
            setCountdown(5);
        }
    };

    useEffect(() => {
        checkWeather();
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    checkWeather();
                    return 5;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-slate-900 text-white font-sans">
            <div className="max-w-[1200px] mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Weather API Sync
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight flex items-center gap-4">
                            Admin Portal
                        </h1>
                        <p className="text-slate-400 mt-4 text-xl font-medium italic">
                            Global Sentinel & Forecast Notification Engine
                        </p>
                    </div>

                    <div className="flex items-center gap-6 bg-slate-800/50 p-6 rounded-[32px] border border-slate-700/50 backdrop-blur-xl">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                {isChecking ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin text-primary" />
                                        <span className="text-sm font-bold text-primary">SYNCING DATA...</span>
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw size={16} className="text-green-500" />
                                        <span className="text-sm font-bold text-green-500">REFRESHING IN {countdown}s</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="w-px h-10 bg-slate-700"></div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Last Update</p>
                            <p className="text-sm font-bold">{lastCheck ? lastCheck.toLocaleTimeString() : '---'}</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <StatCard label="Total Users monitored" value={results.length.toString()} icon={<Users className="text-blue-400" />} color="blue" />
                    <StatCard label="Region Coverage" value="All Clusters" icon={<MapPin className="text-purple-400" />} color="purple" />
                    <StatCard label="Notifications Dispatched" value={results.filter(r => r.status === 'Sent').length.toString()} icon={<MessageSquare className="text-orange-400" />} color="orange" />
                </div>

                <div className="bg-slate-800/30 rounded-[40px] border border-slate-700/50 overflow-hidden backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-700/50 bg-slate-800/50">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Farmer / Mobile</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Location Cluster</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Weather Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">SMS Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 text-slate-500">
                                                <Loader2 size={48} className="animate-spin text-primary/30" />
                                                <p className="font-bold italic tracking-tight">Syncing farmer location weather data...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    results.map((res, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-lg">{res.mobile}</p>
                                                <p className="text-xs text-slate-500 font-medium">India Cluster 01</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={14} className="text-slate-500" />
                                                    <span className="font-semibold text-slate-300">{res.location}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex gap-4">
                                                    {res.weather ? (
                                                        <>
                                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl ${res.weather.temp > 35 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-700/50 text-slate-300'}`}>
                                                                <ThermometerSun size={14} />
                                                                <span className="text-xs font-bold">{res.weather.temp}°C</span>
                                                            </div>
                                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl ${res.weather.rainProb > 60 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-700/50 text-slate-300'}`}>
                                                                <CloudRain size={14} />
                                                                <span className="text-xs font-bold">{res.weather.rainProb}%</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-800 text-slate-500 border border-slate-700">
                                                            <AlertTriangle size={14} />
                                                            <span className="text-xs font-bold italic">WEATHER N/A</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <StatusBadge status={res.status} />
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }: any) {
    const colors: any = {
        blue: "from-blue-500/20 to-transparent border-blue-500/20",
        purple: "from-purple-500/20 to-transparent border-purple-500/20",
        orange: "from-orange-500/20 to-transparent border-orange-500/20",
    };
    return (
        <div className={`p-8 bg-slate-800/40 border rounded-[40px] bg-gradient-to-br ${colors[color]} backdrop-blur-xl`}>
            <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-700/50 flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
            <p className="text-4xl font-bold tracking-tighter">{value}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'Sent') {
        return (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-black uppercase">
                <CheckCircle2 size={12} />
                Action Dispatched
            </div>
        );
    }
    if (status.includes('Failed') || status.includes('Skipped')) {
        return (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-black uppercase">
                <AlertTriangle size={12} />
                {status}
            </div>
        );
    }
    if (status.includes('Throttled')) {
        return (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase">
                <RefreshCw size={12} className="animate-spin-slow" />
                On Hold (24h)
            </div>
        );
    }
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 text-slate-500 text-[10px] font-black uppercase">
            <XCircle size={12} />
            No Risk Detected
        </div>
    );
}
