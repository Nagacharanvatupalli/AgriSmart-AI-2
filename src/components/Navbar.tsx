import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Crops', id: 'crops' },
    { name: 'Weather', id: 'weather' },
    { name: 'AI Advise', id: 'assistant' },
    { name: 'ML Crop Doctor', id: 'diagnosis' },
    { name: 'Market Prices', id: 'market' },
    { name: 'Dashboard', id: 'dashboard' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm text-white border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-xl font-bold tracking-tight">AgriSmart <span className="text-primary">AI</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wider transition-colors hover:text-primary",
                    currentView === link.id ? "text-primary" : "text-white/80"
                  )}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 border-l border-white/20 pl-8">
              {!isLoggedIn ? (
                <>
                  <button 
                    onClick={() => onNavigate('login')}
                    className="text-xs font-bold hover:text-primary transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => onNavigate('register')}
                    className="bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-primary-dark transition-all"
                  >
                    Register
                  </button>
                </>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"
                  >
                    <User size={16} />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 text-black">
                      <button 
                        onClick={() => { setIsLoggedIn(false); setShowProfileMenu(false); onNavigate('home'); }}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 gap-2"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setIsOpen(false); }}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-white/70 hover:text-primary"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              {!isLoggedIn ? (
                <>
                  <button 
                    onClick={() => { onNavigate('login'); setIsOpen(false); }}
                    className="w-full text-center py-2 text-sm font-bold text-white border border-white/20 rounded-lg"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => { onNavigate('register'); setIsOpen(false); }}
                    className="w-full text-center bg-primary text-white py-2 rounded-lg text-sm font-bold"
                  >
                    Register
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { setIsLoggedIn(false); setIsOpen(false); onNavigate('home'); }}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-white/70 hover:text-primary"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
