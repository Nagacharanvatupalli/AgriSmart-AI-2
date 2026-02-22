/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
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
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { analyzeCropImage, getAgriculturalAdvice, getSeasonalInsights } from './services/geminiService';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthPage from './components/AuthPage';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tab = 'home' | 'dashboard' | 'diagnosis' | 'assistant' | 'market' | 'crops' | 'weather' | 'login' | 'register';

interface SeasonalData {
  recommendedCrops: string[];
  risks: string[];
  tasks: string[];
  summary: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [seasonalData, setSeasonalData] = useState<SeasonalData | null>(null);
  const [location, setLocation] = useState('Central Valley, CA');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Restore auth state from localStorage on every page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('userName');
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedName || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    setActiveTab('home');
  };

  useEffect(() => {
    fetchSeasonalData();
  }, [location]);

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
      setActiveTab('diagnosis');

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

  if (activeTab === 'home') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          onNavigate={(id) => setActiveTab(id as Tab)}
          currentView={activeTab}
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogout={handleLogout}
        />
        <Home onNavigate={(id) => setActiveTab(id as Tab)} />
      </div>
    );
  }

  if (activeTab === 'login' || activeTab === 'register') {
    return (
      <div className="min-h-screen">
        <AuthPage
          onAuthSuccess={(name?: string) => {
            setIsLoggedIn(true);
            setUserName(name || '');
            setActiveTab('home');
          }}
          onNavigate={(id) => setActiveTab(id as Tab)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <nav className="w-full md:w-64 bg-[#1a1a1a] text-white p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Sprout className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">AgriSmart AI</h1>
        </div>

        <div className="flex flex-col gap-2">
          <NavItem
            icon={<CloudSun size={20} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem
            icon={<Camera size={20} />}
            label="Crop Diagnosis"
            active={activeTab === 'diagnosis'}
            onClick={() => setActiveTab('diagnosis')}
          />
          <NavItem
            icon={<MessageSquare size={20} />}
            label="AI Assistant"
            active={activeTab === 'assistant'}
            onClick={() => setActiveTab('assistant')}
          />
          <NavItem
            icon={<TrendingUp size={20} />}
            label="Market Insights"
            active={activeTab === 'market'}
            onClick={() => setActiveTab('market')}
          />
        </div>

        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <MapPin size={16} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-white/80 w-full"
            />
          </div>
        </div>
      </nav>

      <main className="flex-1 p-4 md:p-10 overflow-y-auto max-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <header>
                <h2 className="serif text-4xl font-medium text-[#1a1a1a]">Good Morning, Farmer</h2>
                <p className="text-black/50 mt-2">Here's what's happening on your farm today.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  icon={<ThermometerSun className="text-orange-500" />}
                  label="Temperature"
                  value="24°C"
                  sub="Optimal for Corn"
                />
                <StatCard
                  icon={<Droplets className="text-blue-500" />}
                  label="Soil Moisture"
                  value="42%"
                  sub="Irrigation needed in 2 days"
                />
                <StatCard
                  icon={<Leaf className="text-primary" />}
                  label="Crop Health"
                  value="Good"
                  sub="92% overall vitality"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5">
                  <h3 className="serif text-2xl mb-6">Seasonal Insights: {format(new Date(), 'MMMM')}</h3>
                  {seasonalData ? (
                    <div className="space-y-6">
                      <p className="text-black/70 leading-relaxed">{seasonalData.summary}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-black/40">Recommended Crops</h4>
                          <ul className="space-y-2">
                            {seasonalData.recommendedCrops.map(crop => (
                              <li key={crop} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                {crop}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-black/40">Key Tasks</h4>
                          <ul className="space-y-2">
                            {seasonalData.tasks.map(task => (
                              <li key={task} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="animate-spin text-black/20" size={32} />
                    </div>
                  )}
                </div>

                <div className="bg-primary text-white rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="serif text-3xl mb-4">Spot something unusual?</h3>
                    <p className="text-white/70 mb-8 max-w-xs">Upload a photo of your crop for an instant AI diagnosis of diseases or pests.</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white text-primary px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white/90 transition-colors"
                    >
                      <Camera size={18} />
                      Start Diagnosis
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  <Sprout className="absolute -bottom-10 -right-10 text-white/10 w-64 h-64" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'diagnosis' && (
            <motion.div
              key="diagnosis"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="serif text-4xl font-medium">Crop Diagnosis</h2>
                  <p className="text-black/50 mt-2">AI-powered analysis of plant health.</p>
                </div>
                {selectedImage && (
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setDiagnosisResult(null);
                    }}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                )}
              </header>

              {!selectedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-black/10 rounded-[32px] p-20 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-black/5 transition-all"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Upload className="text-primary" size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium">Click to upload or drag and drop</p>
                    <p className="text-black/40 text-sm">PNG, JPG or WEBP (max. 10MB)</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="aspect-square rounded-[32px] overflow-hidden border border-black/5 bg-black/5">
                      <img src={selectedImage} alt="Crop to analyze" className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 border border-black/10 rounded-2xl text-sm font-medium hover:bg-black/5 transition-colors"
                    >
                      Upload Different Image
                    </button>
                  </div>

                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 min-h-[400px]">
                    {isAnalyzing ? (
                      <div className="h-full flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={48} />
                        <p className="text-black/40 animate-pulse">Analyzing crop health...</p>
                      </div>
                    ) : diagnosisResult ? (
                      <div className="markdown-body">
                        <Markdown>{diagnosisResult}</Markdown>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-black/30">
                        <Leaf size={48} className="mb-4 opacity-20" />
                        <p>Analysis will appear here.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'assistant' && (
            <motion.div
              key="assistant"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-[calc(100vh-80px)] flex flex-col max-w-4xl mx-auto"
            >
              <header className="mb-8">
                <h2 className="serif text-4xl font-medium">AgriSmart Assistant</h2>
                <p className="text-black/50 mt-2">Ask anything about farming, soil, or pest control.</p>
              </header>

              <div className="flex-1 bg-white rounded-[32px] shadow-sm border border-black/5 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {chatMessages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center text-black/30 p-10">
                      <MessageSquare size={48} className="mb-4 opacity-20" />
                      <p className="max-w-xs">Start a conversation with your AI agricultural consultant.</p>
                      <div className="mt-8 grid grid-cols-1 gap-2 w-full max-w-sm">
                        <QuickQuery
                          text="How to improve soil nitrogen naturally?"
                          onClick={() => setUserInput("How to improve soil nitrogen naturally?")}
                        />
                        <QuickQuery
                          text="Best irrigation schedule for tomatoes?"
                          onClick={() => setUserInput("Best irrigation schedule for tomatoes?")}
                        />
                        <QuickQuery
                          text="Organic ways to control aphids?"
                          onClick={() => setUserInput("Organic ways to control aphids?")}
                        />
                      </div>
                    </div>
                  )}
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        msg.role === 'user' ? "ml-auto items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "p-4 rounded-2xl text-sm leading-relaxed",
                          msg.role === 'user'
                            ? "bg-primary text-white rounded-tr-none"
                            : "bg-[#f5f5f0] text-black rounded-tl-none markdown-body"
                        )}
                      >
                        {msg.role === 'ai' ? <Markdown>{msg.content}</Markdown> : msg.content}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-black/30 mt-1 font-bold">
                        {msg.role === 'user' ? 'You' : 'AgriSmart AI'}
                      </span>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-black/30">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-xs font-medium italic">Thinking...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-[#f5f5f0]/50 border-t border-black/5">
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your question here..."
                      className="flex-1 bg-white border border-black/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!userInput.trim() || isTyping}
                      className="bg-primary text-white p-4 rounded-2xl hover:bg-primary-dark disabled:opacity-50 transition-all"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'market' && (
            <motion.div
              key="market"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <header>
                <h2 className="serif text-4xl font-medium">Market Insights</h2>
                <p className="text-black/50 mt-2">Real-time commodity prices and trends.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MarketCard name="Wheat" price="$215.40" change="+1.2%" trend="up" />
                <MarketCard name="Corn" price="$168.20" change="-0.5%" trend="down" />
                <MarketCard name="Soybeans" price="$432.10" change="+2.4%" trend="up" />
                <MarketCard name="Rice" price="$385.00" change="0.0%" trend="neutral" />
              </div>

              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5">
                <h3 className="serif text-2xl mb-6">Price Trends (Last 30 Days)</h3>
                <div className="h-64 flex items-end gap-2 px-4">
                  {[40, 55, 45, 60, 75, 65, 80, 70, 85, 95, 90, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/10 rounded-t-lg relative group">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="bg-primary rounded-t-lg w-full transition-all group-hover:bg-primary-dark"
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Day {i + 1}: ${200 + h}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest font-bold text-black/30">
                  <span>Feb 1</span>
                  <span>Feb 15</span>
                  <span>Feb 28</span>
                </div>
              </div>
            </motion.div>
          )}

          {(activeTab === 'crops' || activeTab === 'weather') && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-center p-10"
            >
              <div>
                <h2 className="serif text-4xl mb-4">Coming Soon</h2>
                <p className="text-black/50">The {activeTab} module is currently under development.</p>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-8 text-primary font-bold flex items-center gap-2 mx-auto"
                >
                  Back to Dashboard <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
        active
          ? "bg-white/10 text-white"
          : "text-white/50 hover:text-white hover:bg-white/5"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-black/5 flex items-center gap-6">
      <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-black/30">{label}</p>
        <p className="text-2xl font-semibold text-[#1a1a1a]">{value}</p>
        <p className="text-xs text-black/40 mt-1">{sub}</p>
      </div>
    </div>
  );
}

function MarketCard({ name, price, change, trend }: { name: string, price: string, change: string, trend: 'up' | 'down' | 'neutral' }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{name}</h4>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full",
          trend === 'up' ? "bg-green-100 text-green-700" :
            trend === 'down' ? "bg-red-100 text-red-700" :
              "bg-gray-100 text-gray-700"
        )}>
          {change}
        </span>
      </div>
      <p className="text-xl font-semibold">{price}</p>
      <p className="text-[10px] text-black/30 uppercase tracking-wider mt-1">Per Metric Ton</p>
    </div>
  );
}

function QuickQuery({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left px-4 py-2 rounded-xl border border-black/5 text-xs hover:bg-black/5 transition-colors text-black/60"
    >
      {text}
    </button>
  );
}
