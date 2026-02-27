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
import { getVisualSymptoms, getAgriculturalAdvice, getSeasonalInsights } from './services/geminiService';
import { getPerplexityAdvice, detectCropDisease } from './services/perplexityService';
import { getWeatherData } from './services/weatherService';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthPage from './components/AuthPage';
import CropsPage from './components/CropsPage';
import DashboardPage from './components/DashboardPage';
import DiagnosisPage from './components/DiagnosisPage';
import AssistantPage from './components/AssistantPage';
import AdminDashboard from './components/AdminDashboard';
import MarketPage from './components/MarketPage';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SeasonalData {
  recommendedCrops: string[];
  risks: string[];
  tasks: string[];
  summary: string;
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

// ── Protected Route Wrapper ──────────────────────────────────────────────────
function ProtectedRoute({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactNode }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// ── Main App Component ────────────────────────────────────────────────────────

export default function App() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [seasonalData, setSeasonalData] = useState<SeasonalData | null>(null);
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [fullUser, setFullUser] = useState<any>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
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
      fetchUserProfile(token);
    }
  }, []);

  // Keep userName in sync with fullUser
  useEffect(() => {
    if (fullUser?.profile?.firstName) {
      const { firstName, lastName } = fullUser.profile;
      const fullName = [firstName, lastName].filter(Boolean).join(' ') || fullUser.mobile || '';
      setUserName(fullName);
      localStorage.setItem('userName', fullName);
    }
  }, [fullUser]);

  const fetchUserProfile = async (token: string) => {
    setIsProfileLoading(true);
    try {
      const response = await fetch('/api/auth/profile', {
        headers: { 'x-auth-token': token }
      });
      if (response.ok) {
        const data = await response.json();
        setFullUser(data);
        if (data.location) {
          const locParts = [data.location.district, data.location.mandal].filter(Boolean).join(', ');
          setLocation(locParts || data.location.state || '');
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to connect to server. Check if server is running on port 3000.');
    } finally {
      setIsProfileLoading(false);
    }
  };

  const updateProfile = async (updatedData: any) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const result = await response.json();
        setFullUser(result.user);
        if (result.user.location) {
          const locParts = [result.user.location.district, result.user.location.mandal].filter(Boolean).join(', ');
          setLocation(locParts || result.user.location.state || '');
        }
        if (result.user.profile?.firstName) {
          setUserName(result.user.profile.firstName);
          localStorage.setItem('userName', result.user.profile.firstName);
        }
        return true;
      } else {
        const errorData = await response.json();
        alert('Update failed: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error connecting to server for update.');
    }
    return false;
  };

  const addCrop = async (cropData: any) => {
    console.log('--- FRONTEND ADD CROP CALL ---');
    console.log('Payload:', cropData);
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found in localStorage!');
      return false;
    }

    try {
      const url = '/api/auth/crops';
      console.log('Fetching URL:', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(cropData)
      });
      console.log('Response Status:', response.status);

      if (response.ok) {
        const result = await response.json();
        setFullUser(result.user);
        return true;
      } else {
        const errorData = await response.json();
        alert('Failed to add crop: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error: any) {
      console.error('Error adding crop details:', error);
      alert('Error connecting to server: ' + (error.message || 'Unknown network error'));
    }
    return false;
  };

  const selectCrop = async (cropId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const response = await fetch('/api/auth/crops/select', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ cropId })
      });

      if (response.ok) {
        const result = await response.json();
        setFullUser(result.user);
        return true;
      } else {
        const errorData = await response.json();
        alert('Failed to select crop: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error selecting crop:', error);
      alert('Error connecting to server to select crop.');
    }
    return false;
  };

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
        // Direct expert diagnosis using Perplexity Vision
        const result = await detectCropDisease(base64.split(',')[1], file.type, i18n.language || 'en');
        setDiagnosisResult(result || "Could not generate diagnosis.");
      } catch (error) {
        console.error("Diagnosis flow error:", error);
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
      const response = await getPerplexityAdvice(userMsg, i18n.language || 'en');
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
        <Route path="/login" element={<AuthPage onAuthSuccess={(name?: string, user?: any) => {
          setIsLoggedIn(true);
          setUserName(name || '');
          if (user) setFullUser(user);
          navigate('/dashboard');
        }} />} />
        <Route path="/register" element={<AuthPage onAuthSuccess={(name?: string, user?: any) => {
          setIsLoggedIn(true);
          setUserName(name || '');
          if (user) setFullUser(user);
          navigate('/dashboard');
        }} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <DashboardPage
              userName={userName}
              onImageUpload={handleImageUpload}
              fileInputRef={fileInputRef}
              user={fullUser}
              onUpdateProfile={updateProfile}
              onAddCrop={addCrop}
              onSelectCrop={selectCrop}
              isLoading={isProfileLoading}
            />
          </ProtectedRoute>
        } />
        <Route path="/diagnosis" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <DiagnosisPage
              selectedImage={selectedImage}
              onImageUpload={handleImageUpload}
              fileInputRef={fileInputRef}
              isAnalyzing={isAnalyzing}
              diagnosisResult={diagnosisResult}
              onReset={() => { setSelectedImage(null); setDiagnosisResult(null); }}
              isLoggedIn={isLoggedIn}
            />
          </ProtectedRoute>
        } />
        <Route path="/assistant" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <AssistantPage
              chatMessages={chatMessages}
              userInput={userInput}
              onUserInputChange={setUserInput}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              chatEndRef={chatEndRef}
            />
          </ProtectedRoute>
        } />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/crops" element={<CropsPage />} />
        <Route path="/weather" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <WeatherPage
              location={location}
              weatherData={weatherData}
              isLoading={isWeatherLoading}
              error={weatherError}
              onRetry={fetchWeather}
              onLocationChange={setLocation}
            />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

// ── Shared mini-components ────────────────────────────────────────────────────

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
