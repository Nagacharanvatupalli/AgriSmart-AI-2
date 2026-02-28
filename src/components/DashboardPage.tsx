import React, { useState, useEffect } from 'react';
import {
    Plus,
    User,
    CheckCircle2,
    MapPin,
    Leaf,
    Pencil,
    Calendar,
    TrendingUp,
    TrendingDown,
    Droplets,
    CloudSun,
    ArrowUpRight,
    X,
    Loader2,
    BarChart3,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getWeatherData } from '../services/weatherService';
import { useTranslation } from 'react-i18next';
import CropSuggestionsModal from './CropSuggestionsModal';

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
    const { t, i18n } = useTranslation();

    const translateCrop = React.useCallback((cropName: string | undefined) => {
        if (!cropName) return t('dashboard.not_selected');
        // Define common crop keys
        const cropKeys = [
            'paddy', 'wheat', 'cotton', 'maize', 'chilli', 'turmeric',
            'tomato', 'sugarcane', 'groundnut', 'mustard', 'onion',
            'potato', 'guava', 'mango', 'banana', 'grapes',
            'ginger', 'garlic', 'soybean', 'chickpea',
            'black_gram', 'green_gram', 'tea'
        ];

        // Find if the cropName matches any of the English names in resources
        const foundKey = cropKeys.find(key => {
            const enName = i18n.getResource('en', 'translation', `crops_page.data.${key}.name`);
            return enName?.toLowerCase() === cropName.toLowerCase();
        });

        return foundKey ? t(`crops_page.data.${foundKey}.name`) : cropName;
    }, [t, i18n]);

    const translateLocation = React.useCallback((locName: string | undefined) => {
        if (!locName) return '';
        // Map common names to translation keys
        const locMap: Record<string, string> = {
            'Andhra Pradesh': 'andhra_pradesh',
            'Telangana': 'telangana',
            'Guntur': 'guntur',
            'Chittoor': 'chittoor',
            'Kurnool': 'kurnool',
            'Warangal': 'warangal',
            'Hyderabad': 'hyderabad'
        };

        const key = locMap[locName];
        return key ? t(`dashboard.locations.${key}`) : locName;
    }, [t]);

    const translateName = React.useCallback((name: string | undefined) => {
        if (!name || name === 'FARMER NAME' || name === 'Farmer') return t('dashboard.locations.farmer');
        return name;
    }, [t]);
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

    const [weatherData, setWeatherData] = useState<any>(null);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [weatherError, setWeatherError] = useState<string | null>(null);

    const [marketData, setMarketData] = useState<any>(null);
    const [marketLoading, setMarketLoading] = useState(false);
    const [marketError, setMarketError] = useState<string | null>(null);

    const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);

    // Initial popup load logic
    useEffect(() => {
        if (user && user.crops && user.crops.length > 0) {
            const hasShown = sessionStorage.getItem('cropSuggestionsShown');
            if (!hasShown) {
                // Short delay so it feels like a post-login action naturally settling in
                const timer = setTimeout(() => {
                    setShowSuggestionsModal(true);
                    sessionStorage.setItem('cropSuggestionsShown', 'true');
                }, 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [user?.crops]);

    useEffect(() => {
        if (!user?.location) return;
        const locationQuery = [
            user.location.mandal,
            user.location.district,
            user.location.state
        ].filter(Boolean).join(', ');
        if (!locationQuery) return;

        setWeatherLoading(true);
        setWeatherError(null);
        getWeatherData(locationQuery)
            .then(data => {
                if (data) setWeatherData(data);
                else setWeatherError('Location not found');
            })
            .catch(() => setWeatherError('Failed to fetch weather'))
            .finally(() => setWeatherLoading(false));
    }, [user?.location?.mandal, user?.location?.district]);

    // Fetch market price for active crop
    useEffect(() => {
        // Priority: Local User Profile > LocalStorage > Default
        const cropName = user?.cropDetails?.cropName || localStorage.getItem('market_selectedCrop');
        const district = user?.location?.district || localStorage.getItem('market_location');

        const token = localStorage.getItem('token');
        if (!token) {
            setMarketError('Please log in');
            setMarketLoading(false);
            return;
        }

        setMarketLoading(true);
        setMarketError(null);
        fetch(`/api/market/prices?crop=${encodeURIComponent(cropName)}&market=${encodeURIComponent(district || 'India')}`, {
            headers: { 'x-auth-token': token }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    setMarketError('No price data');
                } else {
                    // Store the whole list, UI will pick primary
                    setMarketData(data);
                }
            })
            .catch(() => setMarketError('No price data'))
            .finally(() => setMarketLoading(false));
    }, [user?.cropDetails?.cropName, user?.location?.district]);

    const primaryMarket = Array.isArray(marketData)
        ? (marketData.find(m => m.is_primary) || marketData[0])
        : null;

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

    const calculateIrrigation = (cropName: string | undefined, weather: any) => {
        if (!cropName) return t('dashboard.irrigation_normal', { defaultValue: 'Normal (10-15mm/day)' });

        const crop = cropName.toLowerCase();
        let baseNeeds = '';

        // General estimates based on common crops
        if (crop.includes('paddy') || crop.includes('rice')) {
            baseNeeds = 'High (10-15mm/day)';
        } else if (crop.includes('wheat') || crop.includes('maize') || crop.includes('cotton')) {
            baseNeeds = 'Medium (5-8mm/day)';
        } else if (crop.includes('groundnut') || crop.includes('chickpea') || crop.includes('mustard')) {
            baseNeeds = 'Low (3-5mm/day)';
        } else if (crop.includes('sugarcane') || crop.includes('banana')) {
            baseNeeds = 'Very High (15-20mm/day)';
        } else {
            baseNeeds = 'Moderate (5-10mm/day)';
        }

        // Adjust if it's raining
        if (weather?.current?.rain > 0) {
            return `Skip (Rain: ${weather.current.rain}mm)`;
        }

        return baseNeeds;
    };

    const getCropSuggestions = (cropName: string | undefined, weather: any) => {
        if (!cropName) return [t('dashboard.ai_recommendation.no_crop', { defaultValue: 'Please set your active crop to receive tailored insights.' })];

        const crop = cropName.toLowerCase();
        const rain = weather?.current?.rain || 0;

        const suggestions: string[] = [];

        if (crop.includes('paddy') || crop.includes('rice')) {
            suggestions.push("Maintain standing water of 2-5cm during early vegetative stages.");
            suggestions.push("Monitor for stem borer and apply Neem oil as preventive measure.");
            suggestions.push("Profit Tip: Plant a legume crop like black gram after harvest to fix nitrogen and reduce next season's fertilizer costs.");
        } else if (crop.includes('cotton')) {
            suggestions.push("Avoid field waterlogging to prevent early boll shedding.");
            suggestions.push("Inspect undersides of leaves actively for whitefly infestation.");
            suggestions.push("Profit Tip: Implement drip irrigation to save up to 40% on water and fertilizer costs, drastically improving ROI.");
        } else if (crop.includes('maize')) {
            suggestions.push("Top dress with nitrogen at knee-high stage for optimal growth.");
            suggestions.push("Keep field weed-free during precisely the first 30 days.");
            suggestions.push("Profit Tip: Intercrop with beans or cowpeas to suppress weeds naturally and create a secondary income stream.");
        } else if (crop.includes('wheat')) {
            suggestions.push("Ensure timely irrigation at crown root initiation (CRI) stage.");
            suggestions.push("Check rigorously for yellow rust symptoms on lower leaves.");
            suggestions.push("Profit Tip: Avoid applying excess urea. Conduct a soil test to apply only needed nutrients and save on input costs.");
        } else if (crop.includes('tomato') || crop.includes('chilli')) {
            suggestions.push("Ensure proper staking to prevent fruit rot and soil contact.");
            suggestions.push("Apply mulch to retain soil moisture and naturally reduce weeds.");
            suggestions.push("Profit Tip: Monitor market trends closely. Prices often peak sharply 3-4 weeks from now, consider staggered harvesting.");
        } else if (crop.includes('groundnut')) {
            suggestions.push("Apply gypsum at the pegging stage to improve pod development.");
            suggestions.push("Check for tikka leaf spot and apply fungicides if spots appear.");
            suggestions.push("Profit Tip: Sell your harvest during the exact off-season window to secure a 15-20% premium over harvest-time prices.");
        } else {
            suggestions.push(`Monitor ${translateCrop(cropName)} closely for early signs of nutrient deficiency.`);
            suggestions.push("Ensure proper field drainage to maintain healthy root systems.");
            suggestions.push("Profit Tip: Before purchasing expensive chemical fertilizers, check if your region has active government subsidies available.");
        }

        if (rain > 5) {
            suggestions.push("Heavy rain detected: Delay any planned fertilizer or pesticide application.");
        } else if (weather?.current?.temperature > 35) {
            suggestions.push("High heat alert: Apply light irrigation in the evening to reduce stress.");
        }

        return suggestions;
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-gray-50/50 relative">
            {isLoading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 size={48} className="text-[#00ab55] animate-spin" />
                        <p className="text-[#00ab55] font-black text-[10px] uppercase tracking-widest">{t('dashboard.loading.gathering')}</p>
                    </div>
                </div>
            )}
            <div className="max-w-[1600px] mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{t('dashboard.title')}</h1>
                        <p className="text-gray-400 mt-1 font-medium italic">{t('dashboard.subtitle')}</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setIsAddCropModalOpen(true)} className="bg-[#00ab55] text-white font-black text-[10px] uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-[#00964a] transition-all shadow-lg shadow-[#00ab55]/20 flex items-center gap-2">
                            <Plus size={16} /> {t('dashboard.add_crop')}
                        </button>
                        <button onClick={() => setIsMyCropsModalOpen(true)} className="bg-white text-[#00ab55] border-2 border-[#00ab55]/20 font-black text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-[#00ab55]/5 transition-all">
                            {t('dashboard.my_crops')}
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
                            {translateName(userName)}
                        </h2>

                        <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00ab55]/20 bg-[#00ab55]/5 text-[#00ab55] text-[10px] font-bold uppercase tracking-widest">
                            <CheckCircle2 size={12} /> {t('dashboard.verified')}
                        </div>

                        <div className="w-full mt-10 space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">{t('dashboard.location_details')}</h3>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-300 uppercase">{translateLocation(user?.location?.state) || t('dashboard.not_set')}</p>
                                    <p className="text-sm font-bold text-gray-700">
                                        {translateLocation(user?.location?.district) || ''}
                                        {user?.location?.district && user?.location?.mandal ? ', ' : ''}
                                        {translateLocation(user?.location?.mandal) || ''}
                                        {!user?.location?.district && !user?.location?.mandal && t('dashboard.details_not_set')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Leaf size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-300 uppercase">{t('dashboard.primary_crop')}</p>
                                    <p className="text-sm font-bold text-gray-700">{translateCrop(user?.cropDetails?.cropName)}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="w-full mt-10 bg-[#161b22] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3"
                        >
                            <Pencil size={16} /> {t('dashboard.edit_profile')}
                        </button>
                    </div>

                    {/* Right Column: Stats and Info */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Top Stats Strip */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DashboardStat
                                label={t('dashboard.active_crop')}
                                value={translateCrop(user?.cropDetails?.cropName) || "Paddy"}
                                icon={<Leaf className="text-green-500" size={24} />}
                            />
                            <DashboardStat
                                label={t('dashboard.market_trend')}
                                value={marketLoading ? t('dashboard.loading.thinking') : primaryMarket?.percentage_change ? `${parseFloat(primaryMarket.percentage_change) >= 0 ? '↑' : '↓'} ${Math.abs(parseFloat(primaryMarket.percentage_change))}%` : (primaryMarket ? '0%' : 'N/A')}
                                icon={
                                    primaryMarket ? (
                                        parseFloat(primaryMarket.percentage_change || '0') < 0
                                            ? <TrendingDown className="text-red-500" size={24} />
                                            : <TrendingUp className={parseFloat(primaryMarket.percentage_change || '0') > 0 ? "text-green-500" : "text-orange-500"} size={24} />
                                    ) : <TrendingUp className="text-gray-300" size={24} />
                                }
                            />
                            <DashboardStat
                                label={t('dashboard.irrigation')}
                                value={calculateIrrigation(user?.cropDetails?.cropName, weatherData)}
                                icon={<Droplets className="text-blue-400" size={24} />}
                            />
                        </div>

                        {/* Middle Row: Weather Feed and Recommendation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/50 border border-gray-100">
                                <header className="flex items-center gap-2 mb-8">
                                    <CloudSun className="text-[#00ab55]" size={20} />
                                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">{t('dashboard.weather_feed')}</h3>
                                </header>

                                <div className="space-y-6">
                                    {weatherLoading ? (
                                        <div className="flex items-center justify-center py-6">
                                            <Loader2 size={28} className="text-[#00ab55] animate-spin" />
                                        </div>
                                    ) : weatherError ? (
                                        <p className="text-xs text-red-400 text-center py-4">{weatherError}</p>
                                    ) : weatherData ? (
                                        <>
                                            <WeatherRow
                                                label={t('dashboard.weather.temp')}
                                                value={`${weatherData.current.temperature}°C`}
                                            />
                                            <WeatherRow
                                                label={t('dashboard.weather.humidity')}
                                                value={`${weatherData.current.humidity}%`}
                                            />
                                            <WeatherRow
                                                label={t('dashboard.weather.rain_today')}
                                                value={weatherData.current.rain > 0 ? `${weatherData.current.rain} mm` : t('dashboard.weather.none')}
                                                highlighted={weatherData.current.rain > 0}
                                            />
                                            <WeatherRow
                                                label={t('dashboard.weather.wind_speed')}
                                                value={`${weatherData.current.windSpeed} km/h`}
                                            />
                                            {weatherData.forecast[0] && (
                                                <WeatherRow
                                                    label={t('dashboard.weather.tomorrow_rain')}
                                                    value={t('dashboard.weather.chance', { percent: weatherData.forecast[0].rainChance })}
                                                    highlighted={weatherData.forecast[0].rainChance > 50}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-xs text-gray-400 text-center py-4">{t('dashboard.weather.set_location')}</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-[#0a2635] rounded-[40px] p-8 shadow-xl shadow-gray-900/10 text-white flex flex-col justify-between relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ab55]/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#00ab55]/20 transition-all duration-500" />
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight mb-4">{t('dashboard.ai_recommendation.title')}</h3>
                                    <div className="space-y-3">
                                        {getCropSuggestions(user?.cropDetails?.cropName, weatherData).map((suggestion, idx) => {
                                            const isProfitTip = suggestion.startsWith('Profit Tip:');
                                            return (
                                                <div key={idx} className={cn("flex items-start gap-2.5", isProfitTip && "mt-4 p-3 rounded-xl bg-[#00ab55]/10 border border-[#00ab55]/20")}>
                                                    {!isProfitTip && <div className="w-1.5 h-1.5 rounded-full bg-[#00ab55] mt-1.5 shrink-0 shadow-[0_0_8px_#00ab55]" />}
                                                    <p className={cn("text-white/80 text-sm leading-relaxed", isProfitTip && "text-[#00ab55] font-medium")}>
                                                        {isProfitTip ? <><strong>Tip:</strong> {suggestion.replace('Profit Tip:', '')}</> : suggestion}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00ab55] hover:text-white transition-colors mt-8">
                                    {t('dashboard.ai_recommendation.access_lab')} <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Market Price Widget */}
                        <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/50 border border-gray-100">
                            <header className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="text-[#00ab55]" size={20} />
                                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">{t('dashboard.market.title')}</h3>
                                </div>
                                <button
                                    onClick={() => window.location.href = '/market'}
                                    className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#00ab55] hover:text-[#00964a] transition-colors"
                                >
                                    {t('dashboard.market.view_all')} <ArrowUpRight size={12} />
                                </button>
                            </header>

                            {marketLoading ? (
                                <div className="flex items-center justify-center py-10">
                                    <Loader2 size={28} className="text-[#00ab55] animate-spin" />
                                </div>
                            ) : marketError ? (
                                <div className="py-8 text-center">
                                    <p className="text-gray-400 text-sm font-medium">{marketError}</p>
                                    <p className="text-gray-300 text-xs mt-1 italic">{t('dashboard.market.set_crop_desc', { defaultValue: 'Set your primary crop in profile to see live prices.' })}</p>
                                </div>
                            ) : primaryMarket ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-5 bg-[#00ab55]/5 rounded-2xl border border-[#00ab55]/10">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('dashboard.market.commodity')}</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-lg font-bold text-gray-900">{translateCrop(primaryMarket.commodity)}</p>
                                                {primaryMarket.percentage_change && parseFloat(primaryMarket.percentage_change) !== 0 && (
                                                    <div className={cn(
                                                        "flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[8px] font-black",
                                                        parseFloat(primaryMarket.percentage_change) > 0 ? "bg-[#00ab55]/10 text-[#00ab55]" : "bg-red-100 text-red-500"
                                                    )}>
                                                        {parseFloat(primaryMarket.percentage_change) > 0 ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                                                        {parseFloat(primaryMarket.percentage_change) > 0 ? '+' : ''}{primaryMarket.percentage_change}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('dashboard.market.modal_price')}</p>
                                            <p className="text-2xl font-bold text-[#00ab55]">₹{primaryMarket.modal_price}</p>
                                            {primaryMarket.previous_modal_price && (
                                                <p className="text-[8px] font-bold text-gray-400 italic">{t('dashboard.market.was', { price: primaryMarket.previous_modal_price })}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                            <ArrowDown className="text-red-400" size={16} />
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">{t('dashboard.market.min')}</p>
                                                <p className="text-sm font-bold text-gray-700">₹{primaryMarket.min_price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                            <ArrowUp className="text-green-500" size={16} />
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">{t('dashboard.market.max')}</p>
                                                <p className="text-sm font-bold text-gray-700">₹{primaryMarket.max_price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-2xl italic">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{t('dashboard.market.market')}</span>
                                        <span className="text-xs font-bold text-gray-600">{primaryMarket.market}, {primaryMarket.district}</span>
                                    </div>

                                    {/* Nearby Markets Section */}
                                    {marketData.length > 1 && (
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{t('dashboard.market.nearby')}</h4>
                                            <div className="space-y-2">
                                                {marketData.filter((m: any) => !m.is_primary).map((m: any, i: number) => (
                                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors">
                                                        <div>
                                                            <p className="text-[11px] font-bold text-gray-700 leading-tight">{m.market}</p>
                                                            <p className="text-[9px] text-gray-400 font-medium">{m.district}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[11px] font-bold text-[#00ab55]">₹{m.modal_price}</p>
                                                            <p className={cn(
                                                                "text-[8px] font-black",
                                                                parseFloat(m.percentage_change) >= 0 ? "text-[#00ab55]" : "text-red-500"
                                                            )}>
                                                                {parseFloat(m.percentage_change) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(m.percentage_change))}%
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : null}
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
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{t('dashboard.modals.edit_profile')}</h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.first_name')}</label>
                                        <input
                                            type="text"
                                            value={editFormData.firstName}
                                            onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.last_name')}</label>
                                        <input
                                            type="text"
                                            value={editFormData.lastName}
                                            onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.state')}</label>
                                    <input
                                        type="text"
                                        value={editFormData.state}
                                        onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.district')}</label>
                                        <input
                                            type="text"
                                            value={editFormData.district}
                                            onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.mandal')}</label>
                                        <input
                                            type="text"
                                            value={editFormData.mandal}
                                            onChange={(e) => setEditFormData({ ...editFormData, mandal: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.primary_crop')}</label>
                                    <input
                                        type="text"
                                        value={editFormData.cropName}
                                        onChange={(e) => setEditFormData({ ...editFormData, cropName: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.sowing_date')}</label>
                                        <input
                                            type="date"
                                            value={editFormData.startDate}
                                            onChange={(e) => setEditFormData({ ...editFormData, startDate: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.harvest_date')}</label>
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
                                    {t('dashboard.modals.cancel')}
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-1 bg-[#00ab55] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00964a] transition-all shadow-lg shadow-[#00ab55]/20 flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : t('dashboard.modals.save')}
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
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{t('dashboard.modals.my_crops')}</h2>
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
                                            <h4 className="font-bold text-gray-900 uppercase tracking-tight">{translateCrop(crop.cropName)}</h4>
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
                                                {t('dashboard.modals.select')}
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
                                <Plus size={16} /> {t('dashboard.modals.add_another')}
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
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{t('dashboard.modals.add_new_crop')}</h2>
                                <button onClick={() => setIsAddCropModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.crop_name')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('dashboard.modals.crop_name_placeholder')}
                                        value={newCropData.cropName}
                                        onChange={(e) => setNewCropData({ ...newCropData, cropName: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.sowing_date')}</label>
                                        <input
                                            type="date"
                                            value={newCropData.startDate}
                                            onChange={(e) => setNewCropData({ ...newCropData, startDate: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#00ab55]/10 font-bold text-sm text-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">{t('dashboard.modals.harvest_date')}</label>
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
                                    {t('dashboard.modals.cancel')}
                                </button>
                                <button
                                    onClick={handleAddCrop}
                                    disabled={isSaving || !newCropData.cropName}
                                    className="flex-1 bg-[#00ab55] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00964a] transition-all shadow-lg shadow-[#00ab55]/20 flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : t('dashboard.modals.add_crop')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {showSuggestionsModal && (
                <CropSuggestionsModal
                    crops={user?.crops || []}
                    location={user?.location?.district || ''}
                    onClose={() => setShowSuggestionsModal(false)}
                />
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
