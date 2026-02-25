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

import { useTranslation } from 'react-i18next';

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

const LANGUAGES = [
  { code: 'en', name: 'ENGLISH' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' }
];

export default function Navbar({ isLoggedIn, userName, onLogout }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setShowLangMenu(false);
  };

  const navLinks = [
    { name: t('nav.home'), id: '/' },
    { name: t('nav.crops'), id: '/crops' },
    { name: t('nav.weather'), id: '/weather' },
    { name: t('nav.ai_advice'), id: '/assistant' },
    { name: t('nav.market'), id: '/market' },
    { name: t('nav.dashboard'), id: '/dashboard' },
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
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black text-white hover:bg-white/20 transition-all border border-white/5"
                >
                  <Globe size={14} className="text-white/60" />
                  {currentLang.name}
                  <ChevronDown size={14} className={cn("text-white/60 transition-transform", showLangMenu && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {showLangMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 right-0 bg-[#0a2635] border border-white/10 rounded-2xl p-2 shadow-2xl min-w-[140px]"
                    >
                      {LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={cn(
                            "w-full text-left px-4 py-2 rounded-xl text-[10px] font-black transition-colors mb-1 last:mb-0",
                            i18n.language === lang.code ? "bg-[#00ab55] text-white" : "text-white/60 hover:bg-white/5"
                          )}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <button onClick={() => navigate('/login')} className="text-[10px] font-black text-white/70 hover:text-white transition-colors uppercase">{t('nav.login')}</button>
                  <button onClick={() => navigate('/register')} className="bg-[#00ab55] text-white px-5 py-2 rounded-xl text-[10px] font-black hover:bg-[#00964a] transition-all shadow-lg shadow-[#00ab55]/20 uppercase">{t('nav.register')}</button>
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
                    {t('nav.logout')}
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
              <div className="flex flex-wrap gap-2 mb-4 p-2 bg-white/5 rounded-2xl">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all",
                      i18n.language === lang.code ? "bg-[#00ab55] text-white" : "text-white/60 border border-white/10"
                    )}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
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
