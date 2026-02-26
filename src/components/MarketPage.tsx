import React, { useState, useEffect } from 'react';
import {
    Search,
    TrendingUp,
    TrendingDown,
    Minus,
    MapPin,
    Calendar,
    ArrowUpRight,
    Loader2,
    Filter,
    ArrowRight,
    AlertCircle,
    BarChart3,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MarketData {
    commodity: string;
    market: string;
    state: string;
    district: string;
    min_price: number;
    max_price: number;
    modal_price: number;
    date: string;
    trend: 'up' | 'down' | 'stable';
    source: string;
}

const POPULAR_CROPS = ['Paddy', 'Cotton', 'Chilli', 'Maize', 'Turmeric', 'Onion', 'Tomato'];

export default function MarketPage() {
    const [searchMarket, setSearchMarket] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('Paddy');
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMarketPrices = async (crop: string, market: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/market/prices?crop=${encodeURIComponent(crop)}&market=${encodeURIComponent(market || 'India')}`);
            if (!response.ok) throw new Error('Failed to fetch market data');
            const data = await response.json();
            setMarketData(data);
        } catch (err: any) {
            setError(err.message || 'Error connecting to market service');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch for overall India or a default state
        fetchMarketPrices(selectedCrop, 'Guntur');
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchMarketPrices(selectedCrop, searchMarket);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-[#f8fafb] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ab55]/5 rounded-full -mr-64 -mt-64 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full -ml-64 -mb-64 blur-3xl -z-10" />

            <div className="max-w-[1400px] mx-auto">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ab55]/10 text-[#00ab55] w-fit">
                            <TrendingUp size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Live Market Intelligence</span>
                        </div>
                        <h1 className="text-5xl font-bold text-[#0a2635] tracking-tight">Market Analysis</h1>
                        <p className="text-gray-500 font-medium italic">Real-time wholesale prices across Indian APMCs.</p>
                    </div>

                    <form onSubmit={handleSearch} className="flex gap-3 w-full lg:max-w-xl">
                        <div className="relative flex-1 group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00ab55] transition-colors">
                                <MapPin size={20} />
                            </div>
                            <input
                                type="text"
                                value={searchMarket}
                                onChange={(e) => setSearchMarket(e.target.value)}
                                placeholder="Search APMC / Market Name (e.g. Guntur, Warangal)"
                                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-[#00ab55]/5 focus:border-[#00ab55]/20 transition-all font-semibold text-gray-700 shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#0a2635] text-white px-8 py-4 rounded-[24px] font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                            <span className="hidden sm:inline">ANALYZE</span>
                        </button>
                    </form>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Filter Sidebar */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <Filter size={18} className="text-[#00ab55]" />
                                <h3 className="text-sm font-bold text-black uppercase tracking-widest">Select Commodity</h3>
                            </div>
                            <div className="flex flex-col gap-2">
                                {POPULAR_CROPS.map(crop => (
                                    <button
                                        key={crop}
                                        onClick={() => {
                                            setSelectedCrop(crop);
                                            fetchMarketPrices(crop, searchMarket);
                                        }}
                                        className={cn(
                                            "flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                                            selectedCrop === crop
                                                ? "bg-[#00ab55]/5 text-[#00ab55] border border-[#00ab55]/20 ring-1 ring-[#00ab55]/10"
                                                : "text-gray-500 hover:bg-gray-50 border border-transparent"
                                        )}
                                    >
                                        {crop}
                                        {selectedCrop === crop && <ArrowRight size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0a2635] rounded-[32px] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:bg-white/10 transition-all duration-500" />
                            <h4 className="text-lg font-bold mb-4">Price Insights</h4>
                            <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
                                Wholesale prices are updated based on the latest Agmarknet bulletins. Variations may occur due to quality grades.
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#00ab55]">
                                <AlertCircle size={14} /> GRADE-A DATA
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 space-y-8">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-[500px] flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-gray-100"
                                >
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-[#00ab55]/10 border-t-[#00ab55] rounded-full animate-spin" />
                                        <TrendingUp className="absolute inset-0 m-auto text-[#00ab55]" size={24} />
                                    </div>
                                    <p className="mt-6 text-[#00ab55] font-black text-[10px] uppercase tracking-[0.3em]">Querying Market Node...</p>
                                </motion.div>
                            ) : error ? (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-[400px] flex flex-col items-center justify-center bg-red-50 rounded-[40px] border border-dashed border-red-100 p-8 text-center"
                                >
                                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 mb-6">
                                        <AlertCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-red-900 mb-2">Market Data Unavailable</h3>
                                    <p className="text-red-500 font-medium italic max-w-sm mb-8">{error}</p>
                                    <button
                                        onClick={() => fetchMarketPrices(selectedCrop, searchMarket)}
                                        className="bg-red-500 text-white px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                                    >
                                        RETRY ANALYSIS
                                    </button>
                                </motion.div>
                            ) : marketData ? (
                                <motion.div
                                    key="data"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    {/* Summary Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <PriceStat
                                            label="Modal Price"
                                            price={marketData.modal_price}
                                            sub={`Avg. price for ${marketData.commodity}`}
                                            trend={marketData.trend}
                                            icon={<BarChart3 className="text-blue-500" size={24} />}
                                            highlight
                                        />
                                        <PriceStat
                                            label="Min Price"
                                            price={marketData.min_price}
                                            sub="Lowest recorded today"
                                            trend="stable"
                                            icon={<ArrowDown className="text-red-400" size={24} />}
                                        />
                                        <PriceStat
                                            label="Max Price"
                                            price={marketData.max_price}
                                            sub="Highest recorded today"
                                            trend="up"
                                            icon={<ArrowUp className="text-[#00ab55]" size={24} />}
                                        />
                                    </div>

                                    {/* Market Details Card */}
                                    <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col md:flex-row gap-10 items-center">
                                        <div className="w-full md:w-1/3 space-y-6">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Market</p>
                                                <h3 className="text-3xl font-bold text-[#0a2635] tracking-tight">{marketData.market}</h3>
                                            </div>
                                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                                <MapPin className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Location</p>
                                                    <p className="text-sm font-bold text-gray-700">{marketData.district}, {marketData.state}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                                <Calendar className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Last Update</p>
                                                    <p className="text-sm font-bold text-gray-700">{new Date(marketData.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 w-full bg-[#f8fafb] rounded-[32px] p-8 border border-gray-100 relative overflow-hidden group">
                                            <div className="absolute top-4 right-8 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#00ab55] animate-pulse" />
                                                <span className="text-[10px] font-black text-[#00ab55] uppercase tracking-widest">LIVE DATA</span>
                                            </div>

                                            <h4 className="text-lg font-bold text-[#0a2635] mb-8">Quick Suggestions</h4>

                                            <div className="space-y-4">
                                                <SuggestionItem
                                                    text={marketData.trend === 'up'
                                                        ? `Prices for ${selectedCrop} are trending upwards. Good time for liquidation.`
                                                        : `Stability observed in ${selectedCrop} prices. Monitor for next 48 hours.`
                                                    }
                                                />
                                                <SuggestionItem
                                                    text={`The price gap between min/max is ${marketData.max_price - marketData.min_price} ₹. Grade quality is key.`}
                                                />
                                            </div>

                                            <button className="mt-8 w-full py-4 bg-white text-[#0a2635] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0a2635] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 group-hover:shadow-md">
                                                DOWNLOAD FULL MARKET REPORT <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PriceStat({ label, price, sub, trend, icon, highlight }: any) {
    return (
        <div className={cn(
            "p-8 rounded-[40px] border transition-all hover:scale-[1.02] relative group overflow-hidden",
            highlight ? "bg-white border-[#00ab55]/20 shadow-xl shadow-[#00ab55]/5" : "bg-white border-gray-100 shadow-sm"
        )}>
            {highlight && (
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 group-hover:opacity-[0.05] transition-opacity">
                    <TrendingUp size={120} />
                </div>
            )}
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                    {icon}
                </div>
                {trend === 'up' && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-[#00ab55]/10 text-[#00ab55] rounded-full">
                        <TrendingUp size={12} />
                        <span className="text-[10px] font-black">+1.2%</span>
                    </div>
                )}
                {trend === 'down' && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-500 rounded-full">
                        <TrendingDown size={12} />
                        <span className="text-[10px] font-black">-0.8%</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <h4 className="text-4xl font-bold text-[#0a2635] tracking-tighter">₹{price}</h4>
                <p className="text-xs font-medium italic text-gray-500 mt-2">{sub}</p>
            </div>
        </div>
    );
}

function SuggestionItem({ text }: { text: string }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="mt-1 w-5 h-5 rounded-full bg-[#00ab55]/10 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ab55]" />
            </div>
            <p className="text-sm font-medium text-gray-600 leading-relaxed italic">{text}</p>
        </div>
    );
}
