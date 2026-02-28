import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sprout, CloudSun, AlertTriangle, Droplets, Info, TrendingUp, ShieldCheck } from 'lucide-react';
import { getWeatherData } from '../services/weatherService';
import { useTranslation } from 'react-i18next';

interface CropStatusBannerProps {
    user: any;
}

export default function CropStatusBanner({ user }: CropStatusBannerProps) {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [diagnosisHistory, setDiagnosisHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (user?.location) {
            const locationQuery = [
                user.location.mandal,
                user.location.district,
                user.location.state
            ].filter(Boolean).join(', ');

            if (locationQuery) {
                setLoading(true);
                getWeatherData(locationQuery)
                    .then(data => setWeatherData(data))
                    .catch(err => console.error('Failed to fetch weather:', err))
                    .finally(() => setLoading(false));
            }
        }

        if (token) {
            fetch('/api/diagnosis/history', {
                headers: { 'x-auth-token': token }
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setDiagnosisHistory(data);
                })
                .catch(err => console.error('Failed to fetch diagnosis history:', err));
        }
    }, [user?.location]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % 3);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    if (!isVisible || !user) return null;

    const hasCrops = user.crops && user.crops.length > 0;
    const activeCrop = user.cropDetails?.cropName || (hasCrops ? user.crops[0].cropName : null);

    const getStatusContent = () => {
        if (!activeCrop) {
            return {
                title: t('crop_status.no_crops_title'),
                message: t('crop_status.no_crops_message'),
                icon: <Info className="text-blue-400" size={20} />,
                bg: "bg-blue-900/40"
            };
        }

        const rain = weatherData?.current?.rain || 0;
        const temp = weatherData?.current?.temperature || 0;
        const crop = activeCrop.toLowerCase();

        // 1. Current Status / Threats
        let threat = null;
        let suggestionKey = "crop_status.monitoring";
        let statusIcon = <Sprout className="text-green-400" size={20} />;
        let statusBg = "bg-green-900/40";

        if (rain > 5) {
            threat = t('crop_status.heavy_rain_threat');
            suggestionKey = "crop_status.heavy_rain_suggestion";
            statusIcon = <AlertTriangle className="text-yellow-400" size={20} />;
            statusBg = "bg-red-900/40";
        } else if (temp > 35) {
            threat = t('crop_status.high_temp_threat');
            suggestionKey = "crop_status.high_temp_suggestion";
            statusIcon = <Droplets className="text-cyan-400" size={20} />;
            statusBg = "bg-blue-900/40";
        } else if (crop.includes('paddy') || crop.includes('rice')) {
            suggestionKey = "crop_status.paddy_suggestion";
        } else if (crop.includes('cotton')) {
            suggestionKey = "crop_status.cotton_suggestion";
        }

        // 2. Productivity Tip
        let prodTipKey = "crop_status.prod_tip_default";
        if (crop.includes('paddy') || crop.includes('rice')) {
            prodTipKey = "crop_status.prod_tip_paddy";
        } else if (crop.includes('cotton')) {
            prodTipKey = "crop_status.prod_tip_cotton";
        } else if (crop.includes('maize')) {
            prodTipKey = "crop_status.prod_tip_maize";
        }

        // 3. History-based Advice
        let historyAdvice = t('crop_status.history_advice_default');
        if (diagnosisHistory.length > 0) {
            const lastDiagnosisFull = diagnosisHistory[0].diagnosisResult;
            const lastDiagnosis = lastDiagnosisFull.toLowerCase();
            if (lastDiagnosis.includes('blast') || lastDiagnosis.includes('fungal')) {
                historyAdvice = t('crop_status.history_advice_fungal');
            } else if (lastDiagnosis.includes('borer') || lastDiagnosis.includes('pest')) {
                historyAdvice = t('crop_status.history_advice_pest');
            } else {
                historyAdvice = t('crop_status.history_advice_recurrence', { disease: lastDiagnosisFull.split('\n')[0].substring(0, 30) });
            }
        }

        const messages = [
            { title: activeCrop, message: threat ? `${threat}. ${t(suggestionKey)}` : t(suggestionKey), icon: statusIcon, bg: statusBg },
            { title: t('crop_status.boost_yield'), message: t(prodTipKey), icon: <TrendingUp className="text-emerald-400" size={20} />, bg: "bg-emerald-900/40" },
            { title: t('crop_status.prevention'), message: historyAdvice, icon: <ShieldCheck className="text-indigo-400" size={20} />, bg: "bg-indigo-900/40" }
        ];

        return messages[messageIndex];
    };

    const status = getStatusContent();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={messageIndex}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                className="fixed top-24 right-6 z-50 w-80"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.02, 1],
                        boxShadow: ["0 0 0px rgba(255, 255, 255, 0)", "0 0 20px rgba(255, 255, 255, 0.1)", "0 0 0px rgba(255, 255, 255, 0)"]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className={`${status.bg} backdrop-blur-xl border border-white/20 rounded-[24px] p-5 shadow-2xl overflow-hidden relative group`}
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white z-10"
                    >
                        <X size={16} />
                    </button>

                    <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${status.bg} border border-white/10`}>
                            {status.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold tracking-tight truncate uppercase text-[10px] tracking-[0.2em] mb-1 opacity-60">
                                {status.title}
                            </h4>
                            <p className="text-white text-sm font-medium leading-relaxed">
                                {status.message}
                            </p>
                            {weatherData && (
                                <div className="flex items-center gap-2 mt-3 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                    <CloudSun size={12} />
                                    {weatherData.current.temperature}°C • {weatherData.current.humidity}% Humidity
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Progress Bar for rotation */}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full overflow-hidden">
                        <motion.div
                            key={messageIndex}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="h-full bg-white/30"
                        />
                    </div>

                    <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500" />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
