import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Volume2, X, ChevronRight, Loader2, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getShortCropAdvice } from '../services/perplexityService';

interface CropSuggestionsModalProps {
    crops: { _id?: string, cropName: string }[];
    location?: string;
    onClose: () => void;
}

export default function CropSuggestionsModal({ crops, location, onClose }: CropSuggestionsModalProps) {
    const { t, i18n } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [adviceText, setAdviceText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Filter to ensure we have crops
    const validCrops = crops.filter(c => c && c.cropName);

    useEffect(() => {
        if (validCrops.length > 0 && currentIndex < validCrops.length) {
            fetchAdviceForCurrentCrop();
        }
    }, [currentIndex]);

    // Handle component unmount to stop speech
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const fetchAdviceForCurrentCrop = async () => {
        const crop = validCrops[currentIndex];
        setIsLoading(true);
        setAdviceText('');
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        setIsSpeaking(false);

        try {
            const advice = await getShortCropAdvice(crop.cropName, i18n.language, location);
            setAdviceText(advice);
        } catch (error) {
            setAdviceText(t('dashboard.suggestions.error', { defaultValue: 'Could not fetch suggestion for this crop right now.' }));
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = () => {
        if (currentIndex < validCrops.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onClose();
        }
    };

    const handleSpeak = () => {
        if (!window.speechSynthesis || !adviceText) return;

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(adviceText);

        // Try to set language
        let langCode = 'en-US';
        if (i18n.language === 'te') langCode = 'te-IN';
        if (i18n.language === 'hi') langCode = 'hi-IN';
        if (i18n.language === 'ta') langCode = 'ta-IN';

        utterance.lang = langCode;

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
    };

    if (validCrops.length === 0) return null;

    const currentCrop = validCrops[currentIndex];
    const isLast = currentIndex === validCrops.length - 1;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 400 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 400 }}
                className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-[32px] shadow-2xl border border-gray-100/50 z-[100] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="bg-[#0a2635] p-5 text-white flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ab55]/20 rounded-full -mr-16 -mt-16 blur-xl pointer-events-none" />
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <Leaf size={20} className="text-[#00ab55]" />
                        </div>
                        <div>
                            <p className="text-[10px] text-[#00ab55] font-black uppercase tracking-widest">{t('dashboard.suggestions.daily_tip', { defaultValue: 'Daily Tip' })}</p>
                            <h3 className="font-bold text-lg leading-tight capitalize">{currentCrop.cropName}</h3>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10">
                        <X size={18} className="text-white/60 hover:text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 relative min-h-[140px]">
                    {isLoading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <Loader2 size={24} className="text-[#00ab55] animate-spin" />
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t('dashboard.suggestions.loading', { defaultValue: 'AI IS THINKING...' })}</p>
                        </div>
                    ) : (
                        <motion.div
                            key={adviceText}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-gray-700 text-sm leading-relaxed"
                        >
                            {adviceText}
                        </motion.div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <button
                        onClick={handleSpeak}
                        disabled={isLoading || !adviceText}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isSpeaking ? 'bg-[#00ab55] text-white shadow-lg shadow-[#00ab55]/20 animate-pulse' : 'bg-white text-gray-500 hover:text-[#00ab55] border border-gray-200 shadow-sm disabled:opacity-50'
                            }`}
                        title="Read aloud"
                    >
                        <Volume2 size={16} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            {validCrops.map((_, i) => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIndex ? 'bg-[#00ab55]' : 'bg-gray-200'}`} />
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={isLoading}
                            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isLast
                                    ? 'bg-[#00ab55]/10 text-[#00ab55] hover:bg-[#00ab55]/20'
                                    : 'bg-black text-white hover:bg-gray-800'
                                }`}
                        >
                            {isLast ? (
                                <>{t('dashboard.suggestions.finish', { defaultValue: 'FINISH' })} <Check size={14} /></>
                            ) : (
                                <>{t('dashboard.suggestions.next', { defaultValue: 'NEXT' })} <ChevronRight size={14} className="-mr-1" /></>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
