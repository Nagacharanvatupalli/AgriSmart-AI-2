import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, LogOut, Pencil } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
}

export default function Navbar({ onNavigate, currentView, isLoggedIn, userName, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
                /* Entire profile area — open on click, close on mouse leave */
                <div
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimer.current) clearTimeout(closeTimer.current);
                  }}
                  onMouseLeave={() => {
                    closeTimer.current = setTimeout(() => setShowProfileMenu(false), 120);
                  }}
                >
                  <button
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity"
                    title={userName || 'Profile'}
                  >
                    {userName ? userName.charAt(0).toUpperCase() : <User size={16} />}
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        key="profile-menu"
                        initial={{ opacity: 0, scale: 0.92, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: -6 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 top-full w-44 origin-top-right"
                        style={{ paddingTop: '6px' }}
                      >
                        <div className="bg-white rounded-xl shadow-xl py-1.5 text-black">
                          {/* User name header */}
                          {userName && (
                            <div className="px-3 py-2 border-b border-gray-100">
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Signed in as</p>
                              <p className="text-xs font-semibold truncate mt-0.5">{userName}</p>
                            </div>
                          )}

                          {/* Edit Profile */}
                          <button
                            onClick={() => { onNavigate('profile'); setShowProfileMenu(false); }}
                            className="flex items-center w-full px-3 py-2 text-xs font-medium hover:bg-gray-50 gap-2 text-gray-700 transition-colors"
                          >
                            <Pencil size={13} />
                            Edit Profile
                          </button>

                          {/* Logout */}
                          <button
                            onClick={() => { onLogout(); setShowProfileMenu(false); }}
                            className="flex items-center w-full px-3 py-2 text-xs font-medium hover:bg-red-50 gap-2 text-red-500 transition-colors"
                          >
                            <LogOut size={13} />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
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
              <div className="pt-4 flex flex-col gap-1 border-t border-white/10">
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
                  <>
                    {userName && (
                      <p className="px-3 py-1 text-xs font-semibold text-white/60 uppercase tracking-wider truncate">{userName}</p>
                    )}
                    <button
                      onClick={() => { onNavigate('profile'); setIsOpen(false); }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium text-white/70 hover:text-primary"
                    >
                      <Pencil size={14} />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => { onLogout(); setIsOpen(false); }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
