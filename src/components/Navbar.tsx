import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, LogOut, Pencil, Globe, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
}

function Sprout({ className, size }: { className?: string, size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 20h10" />
      <path d="M10 20c5.5 0 5.5-10 10-10" />
      <path d="M14 20c-5.5 0-5.5-10-10-10" />
      <path d="M12 20V4" />
    </svg>
  );
}

export default function Navbar({ isLoggedIn, userName, onLogout }: NavbarProps) {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = [
    { name: 'HOME', id: '/' },
    { name: 'CROPS', id: '/crops' },
    { name: 'WEATHER', id: '/weather' },
    { name: 'AI ADVICE', id: '/assistant' },
    { name: 'MARKET PRICES', id: '/market' },
    { name: 'DASHBOARD', id: '/dashboard' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a2635]/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between h-14 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer gap-2" onClick={() => navigate('/')}>
            <Sprout className="text-[#3b8e4f]" size={20} />
            <span className="text-xl font-bold tracking-tight text-white">KisanPortal</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest transition-all py-1.5 relative",
                    pathname === link.id
                      ? "text-[#00ab55]"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.name}
                  {pathname === link.id && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ab55]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 border-l border-white/10 pl-6 h-14">
              <button className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black text-white hover:bg-white/20 transition-all border border-white/5">
                <Globe size={14} className="text-white/60" />
                ENGLISH
                <ChevronDown size={14} className="text-white/60" />
              </button>

              {!isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <button onClick={() => navigate('/login')} className="text-[10px] font-black text-white/70 hover:text-white transition-colors">LOGIN</button>
                  <button onClick={() => navigate('/register')} className="bg-[#00ab55] text-white px-5 py-2 rounded-xl text-[10px] font-black hover:bg-[#00964a] transition-all shadow-lg shadow-[#00ab55]/20">REGISTER</button>
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#d0f2da] flex items-center justify-center text-[#065e49] font-black text-xs uppercase shadow-sm">
                      {userName ? userName.charAt(0) : 'U'}
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{userName || 'NAGA'}</span>
                  </div>

                  <button
                    onClick={() => onLogout()}
                    className="flex items-center gap-2 text-[10px] font-black text-[#e53e3e] hover:text-[#c53030] transition-colors uppercase tracking-widest"
                  >
                    <LogOut size={16} />
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger */}
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
            className="md:hidden bg-[#0a2635] border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { navigate(link.id); setIsOpen(false); }}
                  className={cn(
                    "block w-full text-left px-3 py-2 text-sm font-black uppercase tracking-widest",
                    pathname === link.id ? "text-[#00ab55]" : "text-white/60"
                  )}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-2 border-t border-white/10">
                {!isLoggedIn ? (
                  <>
                    <button onClick={() => { navigate('/login'); setIsOpen(false); }} className="w-full text-center py-2 text-sm font-black text-white/60 border border-white/10 rounded-lg">LOGIN</button>
                    <button onClick={() => { navigate('/register'); setIsOpen(false); }} className="w-full text-center bg-[#00ab55] text-white py-2 rounded-lg text-sm font-black">REGISTER</button>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d0f2da] flex items-center justify-center text-[#065e49] font-black text-xs uppercase">
                        {userName ? userName.charAt(0) : 'U'}
                      </div>
                      <span className="text-sm font-black text-white uppercase tracking-widest">{userName}</span>
                    </div>
                    <button onClick={() => { onLogout(); setIsOpen(false); }} className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm font-black text-[#e53e3e] hover:text-[#c53030] uppercase tracking-widest">
                      <LogOut size={16} /> Logout
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
