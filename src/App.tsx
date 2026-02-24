/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import {
  Sprout,
  Camera,
  MessageSquare,
  CloudSun,
  TrendingUp,
  ChevronRight,
  Upload,
  Loader2,
  X,
  Leaf,
  Droplets,
  ThermometerSun,
  MapPin,
  Calendar,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Pencil,
  User,
  Wind,
  CloudRain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { analyzeCropImage, getAgriculturalAdvice, getSeasonalInsights } from './services/geminiService';
import { getWeatherData } from './services/weatherService';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthPage from './components/AuthPage';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SeasonalData {
  recommendedCrops: string[];
  risks: string[];
  tasks: string[];
  summary: string;
}

// ── Dashboard Page Component ──────────────────────────────────────────────────
interface DashboardPageProps {
  userName: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

function DashboardPage({ userName, onImageUpload, fileInputRef }: DashboardPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-gray-50/50">
      <div className="max-w-[1600px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Farm Management</h1>
            <p className="text-gray-400 mt-1 font-medium italic">Real-time overview of your agricultural assets.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-primary text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
              <Plus size={16} /> ADD NEW CROP
            </button>
            <button className="bg-white text-primary border-2 border-primary/20 font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-primary/5 transition-all">
              MY CROPS
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 rounded-[40px] bg-white p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 text-center uppercase tracking-tight leading-tight max-w-[200px]">
              {userName || 'NAGA CHARAN VATUPALLI'}
            </h2>

            <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest">
              <CheckCircle2 size={12} /> VERIFIED FARMER
            </div>

            <div className="w-full mt-10 space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">LOCATION DETAILS</h3>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-300 uppercase">Andhra Pradesh</p>
                  <p className="text-sm font-bold text-gray-700">Bapatla, Chinaganjam</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Leaf size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-300 uppercase">Primary Crop</p>
                  <p className="text-sm font-bold text-gray-700">Paddy</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-10 bg-[#161b22] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3">
              <Pencil size={16} /> EDIT PROFILE
            </button>
          </div>

          {/* Right Column: Stats and Info */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Top Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DashboardStat
                label="ACTIVE CROP"
                value="Paddy"
                icon={<Leaf className="text-green-500" size={24} />}
              />
              <DashboardStat
                label="CYCLE PROGRESS"
                value="7%"
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
                  <CloudSun className="text-primary" size={20} />
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Daily Weather Feed</h3>
                </header>

                <div className="space-y-6">
                  <WeatherRow label="Morning Temp" value="24°C" />
                  <WeatherRow label="Humidity Levels" value="58%" />
                  <WeatherRow label="Rain Prediction" value="Low (5%)" highlighted />
                </div>
              </div>

              <div className="bg-[#1e5128] rounded-[40px] p-8 shadow-xl shadow-green-900/10 text-white flex flex-col justify-between relative overflow-hidden">
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-4">AI Recommendation</h3>
                  <p className="text-white/70 text-sm leading-relaxed max-w-[280px]">
                    Localized analysis for Chinaganjam shows Increasing soil alkalinity.
                    Consider adjusting phosphate application for your next Paddy cycle.
                  </p>
                </div>

                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d1e2c4] hover:text-white transition-colors mt-8">
                  ACCESS FULL AI LAB <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={onImageUpload} className="hidden" accept="image/*" />
    </div>
  );
}

// ── Diagnosis Page Component ─────────────────────────────────────────────────
interface DiagnosisPageProps {
  selectedImage: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isAnalyzing: boolean;
  diagnosisResult: string | null;
  onReset: () => void;
}

function DiagnosisPage({ selectedImage, onImageUpload, fileInputRef, isAnalyzing, diagnosisResult, onReset }: DiagnosisPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Crop Doctor</h2>
            <p className="text-gray-400 mt-2 font-medium italic">Instant identification of crop diseases and pests.</p>
          </div>
          {selectedImage && (
            <button onClick={onReset} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          )}
        </header>
        {!selectedImage ? (
          <div onClick={() => fileInputRef.current?.click()} className="border-4 border-dashed border-gray-100 rounded-[40px] p-24 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-gray-50 transition-all border-spacing-4">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center"><Upload className="text-primary" size={32} /></div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">Drop your crop image here</p>
              <p className="text-gray-400 text-sm mt-1">Supports JPG, PNG, WEBP (Max 10MB)</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="aspect-square rounded-[40px] overflow-hidden border border-gray-100 bg-gray-50 shadow-inner">
                <img src={selectedImage} alt="Crop to analyze" className="w-full h-full object-cover" />
              </div>
              <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-gray-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors">SCAN NEW IMAGE</button>
            </div>
            <div className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100 min-h-[400px]">
              {isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <Loader2 className="animate-spin text-primary" size={64} />
                    <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/40" size={24} />
                  </div>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-4 animate-pulse">Running AI Diagnostics...</p>
                </div>
              ) : diagnosisResult ? (
                <div className="markdown-body prose prose-slate max-w-none"><Markdown>{diagnosisResult}</Markdown></div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-300">
                  <Camera size={48} className="mb-4 opacity-10" /><p className="font-medium italic">Ready to assist your plants.</p>
                </div>
              )}
            </div>
          </div>
        )}
        <input type="file" ref={fileInputRef} onChange={onImageUpload} className="hidden" accept="image/*" />
      </div>
    </div>
  );
}

// ── Assistant Page Component ──────────────────────────────────────────────────
interface AssistantPageProps {
  chatMessages: { role: 'user' | 'ai'; content: string }[];
  userInput: string;
  onUserInputChange: (val: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

function AssistantPage({ chatMessages, userInput, onUserInputChange, onSendMessage, isTyping, chatEndRef }: AssistantPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-gray-50/50 flex flex-col">
      <div className="max-w-[1000px] mx-auto w-full flex-1 flex flex-col">
        <header className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900">AI Advice</h2>
          <p className="text-gray-400 mt-2 font-medium italic">Your personalized agricultural consultant.</p>
        </header>
        <div className="flex-1 bg-white rounded-[40px] shadow-xl border border-gray-100 flex flex-col overflow-hidden mb-6">
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {chatMessages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-10">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                  <MessageSquare className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">How can I help you today?</h3>
                <p className="text-gray-400 max-w-sm font-medium italic mb-10">Ask me anything about soil health, pest control, or irrigation.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
                  <QuickQuery text="Best time to plant Paddy?" onClick={() => onUserInputChange("Best time to plant Paddy in Andhra Pradesh?")} />
                  <QuickQuery text="Organic nitrogen sources?" onClick={() => onUserInputChange("How to improve soil nitrogen naturally?")} />
                  <QuickQuery text="Tomato blight management?" onClick={() => onUserInputChange("Early signs of tomato blight and organic control?")} />
                  <QuickQuery text="Weather impact on harvest?" onClick={() => onUserInputChange("How does high humidity affect harvest quality?")} />
                </div>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                <div className={cn("p-6 rounded-[28px] text-sm leading-relaxed max-w-[85%]", msg.role === 'user' ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20" : "bg-gray-50 text-gray-700 border border-gray-100 rounded-tl-none")}>
                  {msg.role === 'ai' ? <Markdown>{msg.content}</Markdown> : msg.content}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{msg.role === 'user' ? 'Farmer' : 'Kisan AI'}</span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-3 text-primary/60">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Assistant is thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <form onSubmit={(e) => { e.preventDefault(); onSendMessage(); }} className="flex gap-3">
              <input type="text" value={userInput} onChange={(e) => onUserInputChange(e.target.value)} placeholder="Type your query here..." className="flex-1 bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm" />
              <button type="submit" disabled={!userInput.trim() || isTyping} className="bg-primary text-white p-4 rounded-2xl hover:bg-primary-dark disabled:opacity-50 transition-all shadow-xl shadow-primary/20">
                <ChevronRight size={24} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Weather Page Component ──────────────────────────────────────────────────
interface WeatherPageProps {
  location: string;
  weatherData: any;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onLocationChange: (newLocation: string) => void;
}

function WeatherPage({ location, weatherData, isLoading, error, onRetry, onLocationChange }: WeatherPageProps) {
  const { t, i18n } = useTranslation();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onLocationChange(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-slate-50">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight flex items-center gap-4">
              <CloudSun className="text-primary" size={48} />
              {t('weather.title')}
            </h1>
            <p className="text-gray-400 mt-4 text-xl font-medium italic">
              {t('weather.subtitle', { location: location.split(',')[0] || 'your area' })}
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 w-full md:max-w-md">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('weather.search_placeholder') || "Search for village or city..."}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              {t('weather.search_button') || "Search"}
            </button>
          </form>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
            <Loader2 className="animate-spin text-primary mb-4" size={48} />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{t('weather.fetching')}</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-[40px] border border-dashed border-red-200 text-center px-6">
            <X className="text-red-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-red-900 mb-2">{t('weather.error_title')}</h3>
            <p className="text-red-600/70 mb-8 max-w-sm">{error}</p>
            <button
              onClick={onRetry}
              className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
            >
              {t('weather.try_again')}
            </button>
          </div>
        ) : weatherData ? (
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <WeatherCard
                label={t('weather.temp')}
                value={`${weatherData.current.temperature}°C`}
                icon={<ThermometerSun className="text-orange-500" size={32} />}
                description="Current temperature of your farm."
              />
              <WeatherCard
                label={t('weather.humidity')}
                value={`${weatherData.current.humidity}%`}
                icon={<Droplets className="text-blue-500" size={32} />}
                description="How much moisture is in the air."
              />
              <WeatherCard
                label={t('weather.wind')}
                value={`${weatherData.current.windSpeed} km/h`}
                icon={<Wind className="text-teal-500" size={32} />}
                description="Fast or slow the wind is blowing."
              />
              <WeatherCard
                label={t('weather.rain')}
                value={weatherData.current.rain > 0 ? "It is raining" : "No Rain"}
                icon={<CloudRain className="text-blue-600" size={32} />}
                description="Check if you need to protect your crops."
                highlighted={weatherData.current.rain > 0}
              />
            </div>

            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary" size={24} />
                <h2 className="text-3xl font-bold text-gray-900">{t('weather.forecast_title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border border-gray-100 p-6 rounded-[30px] flex flex-col items-center text-center gap-3 hover:bg-primary/5 transition-all shadow-md hover:shadow-lg cursor-default"
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {new Date(day.date).toLocaleDateString(i18n.language === 'en' ? 'en-US' : (i18n.language === 'te' ? 'te-IN' : (i18n.language === 'hi' ? 'hi-IN' : 'ta-IN')), { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
                      {day.condition.toLowerCase().includes('rain') ? <CloudRain size={24} /> : day.condition.toLowerCase().includes('cloud') ? <CloudSun size={24} /> : <ThermometerSun size={24} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{day.condition}</p>
                      <p className="text-xs text-gray-500">{day.minTemp}°C to {day.maxTemp}°C</p>
                    </div>
                    <div className="mt-2 w-full pt-2 border-t border-gray-200/50">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
                        {day.rainChance}% {t('weather.rain_chance')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[40px] border border-dashed border-gray-200 text-center px-6">
            <MapPin className="text-gray-300 mb-4" size={48} />
            <p className="text-gray-400 font-medium italic">{t('weather.no_location')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function WeatherCard({ label, value, icon, description, highlighted }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-8 rounded-[40px] border-2 flex flex-col justify-between min-h-[280px] transition-all hover:scale-[1.02]",
        highlighted
          ? "bg-primary text-white border-primary shadow-2xl shadow-primary/30"
          : "bg-white text-gray-900 border-white shadow-xl shadow-gray-200/60"
      )}
    >
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", highlighted ? "bg-white/20" : "bg-gray-50")}>
        {icon}
      </div>
      <div>
        <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", highlighted ? "text-white/60" : "text-gray-400")}>{label}</p>
        <p className="text-4xl font-bold tracking-tight mb-4">{value}</p>
        <p className={cn("text-sm font-medium italic", highlighted ? "text-white/70" : "text-gray-500")}>{description}</p>
      </div>
    </motion.div>
  );
}

// ── Main App Component ────────────────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [seasonalData, setSeasonalData] = useState<SeasonalData | null>(null);
  const [location, setLocation] = useState('Bapatla, Chinaganjam');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Restore auth state from localStorage on every page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('userName');
    const storedLocation = localStorage.getItem('userLocation');
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedName || '');
      if (storedLocation) setLocation(storedLocation);
    }
  }, []);

  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/register'].includes(pathname);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userLocation');
    setIsLoggedIn(false);
    setUserName('');
    setLocation('Bapatla, Chinaganjam');
    navigate('/');
  };

  useEffect(() => {
    fetchSeasonalData();
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    if (!location) return;

    // Check if we already have this data cached recently
    if (weatherData && location === localStorage.getItem('lastWeatherLocation')) {
      const lastFetch = localStorage.getItem('lastWeatherFetch');
      if (lastFetch && (Date.now() - parseInt(lastFetch) < 600000)) { // 10 minutes cache
        console.log('Using cached weather data');
        return;
      }
    }

    console.log('Fetching new weather data for:', location);
    setIsWeatherLoading(true);
    setWeatherError(null);
    try {
      const data = await getWeatherData(location);
      if (data) {
        setWeatherData(data);
        localStorage.setItem('lastWeatherFetch', Date.now().toString());
        localStorage.setItem('lastWeatherLocation', location);
      } else {
        setWeatherError("Could not find weather data for your location.");
      }
    } catch (err) {
      setWeatherError("Failed to connect to weather service.");
    } finally {
      setIsWeatherLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const fetchSeasonalData = async () => {
    try {
      const month = format(new Date(), 'MMMM');
      const data = await getSeasonalInsights(location, month);
      setSeasonalData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      setIsAnalyzing(true);
      navigate('/diagnosis');

      try {
        const result = await analyzeCropImage(base64.split(',')[1], file.type);
        setDiagnosisResult(result || "Could not analyze image.");
      } catch (error) {
        setDiagnosisResult("Error analyzing image. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMsg = userInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setUserInput('');
    setIsTyping(true);

    try {
      const response = await getAgriculturalAdvice(userMsg);
      setChatMessages(prev => [...prev, { role: 'ai', content: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', content: "Error communicating with AI assistant." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {!isAuthPage && <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage onAuthSuccess={(name?: string, loc?: string) => { setIsLoggedIn(true); setUserName(name || ''); if (loc) setLocation(loc); navigate('/dashboard'); }} />} />
        <Route path="/register" element={<AuthPage onAuthSuccess={(name?: string, loc?: string) => { setIsLoggedIn(true); setUserName(name || ''); if (loc) setLocation(loc); navigate('/dashboard'); }} />} />
        <Route path="/dashboard" element={
          <DashboardPage
            userName={userName}
            onImageUpload={handleImageUpload}
            fileInputRef={fileInputRef}
          />
        } />
        <Route path="/diagnosis" element={
          <DiagnosisPage
            selectedImage={selectedImage}
            onImageUpload={handleImageUpload}
            fileInputRef={fileInputRef}
            isAnalyzing={isAnalyzing}
            diagnosisResult={diagnosisResult}
            onReset={() => { setSelectedImage(null); setDiagnosisResult(null); }}
          />
        } />
        <Route path="/assistant" element={
          <AssistantPage
            chatMessages={chatMessages}
            userInput={userInput}
            onUserInputChange={setUserInput}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            chatEndRef={chatEndRef}
          />
        } />
        <Route path="/market" element={<ComingSoonPage name="Market" />} />
        <Route path="/crops" element={<ComingSoonPage name="Crops" />} />
        <Route path="/weather" element={
          <WeatherPage
            location={location}
            weatherData={weatherData}
            isLoading={isWeatherLoading}
            error={weatherError}
            onRetry={fetchWeather}
            onLocationChange={setLocation}
          />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

// ── Shared mini-components ────────────────────────────────────────────────────

function DashboardStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md shadow-gray-200/50 border border-gray-100 flex flex-col items-center justify-between min-h-[160px] hover:scale-[1.02] transition-transform cursor-pointer group">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
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
      "flex justify-between items-center px-6 py-4 rounded-2xl",
      highlighted ? "bg-blue-50/50 border border-blue-100 text-blue-600" : "bg-gray-50/50 text-gray-600"
    )}>
      <span className="text-xs font-bold uppercase tracking-widest opacity-60">{label}</span>
      <span className="text-sm font-black">{value}</span>
    </div>
  );
}

function QuickQuery({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-left px-5 py-3 rounded-2xl border border-gray-100 bg-white shadow-sm text-xs font-bold text-gray-500 hover:border-primary/30 hover:text-primary transition-all">
      {text}
    </button>
  );
}

function ComingSoonPage({ name }: { name: string }) {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center text-center p-10 bg-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-6xl font-black text-gray-100 uppercase tracking-tighter mb-4">{name}</h2>
        <p className="text-gray-400 font-medium italic">This module is getting ready for harvest.</p>
        <button onClick={() => navigate('/dashboard')} className="mt-10 bg-primary text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary-dark transition-all">
          RETURN TO PORTAL
        </button>
      </motion.div>
    </div>
  );
}
