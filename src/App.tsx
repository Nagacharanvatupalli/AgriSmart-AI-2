/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
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
  User
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
import CropsPage from './components/CropsPage';
import DashboardPage from './components/DashboardPage';
import DiagnosisPage from './components/DiagnosisPage';
import AssistantPage from './components/AssistantPage';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SeasonalData {
  recommendedCrops: string[];
  risks: string[];
  tasks: string[];
  summary: string;
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
  const [location, setLocation] = useState('');
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
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
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
        <Route path="/crops" element={<CropsPage />} />
        <Route path="/weather" element={<ComingSoonPage name="Weather" />} />
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
