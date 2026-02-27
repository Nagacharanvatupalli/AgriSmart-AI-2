import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sprout, Target, Lightbulb, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <section className="relative h-screen w-full flex items-center justify-start overflow-hidden px-6 lg:px-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-left max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-7xl font-comfortaa text-white mb-4 leading-[1] font-bold"
          >
            {t('home.hero_quote')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-white/70 text-lg md:text-xl mb-10 font-medium max-w-2xl"
          >
            {t('home.hero_sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-start gap-4"
          >
            <button
              onClick={() => navigate('/crops')}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/20 transition-all transform hover:scale-105"
            >
              {t('home.crops_btn')}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary text-white px-12 py-4 rounded-xl text-lg font-bold hover:bg-primary-dark transition-all transform hover:scale-105 flex items-center gap-2 shadow-xl shadow-primary/20"
            >
              {t('home.get_started')}
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-white px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Sprout size={28} />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{t('home.info_title')}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-xl font-light">
                {t('home.info_desc')}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-6 border border-gray-100 rounded-3xl bg-gray-50/50">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{t('home.ai_diagnosis')}</h4>
                  <p className="text-sm text-gray-500">{t('home.ai_diagnosis_desc')}</p>
                </div>
                <div className="p-6 border border-gray-100 rounded-3xl bg-gray-50/50">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{t('home.market_data')}</h4>
                  <p className="text-sm text-gray-500">{t('home.market_data_desc')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Target size={28} />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{t('home.motivation_title')}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-xl font-light">
                {t('home.motivation_desc')}
              </p>
              <div className="flex items-start gap-6 p-8 bg-primary/5 rounded-[40px] border border-primary/10">
                <Lightbulb className="text-primary shrink-0 mt-1" size={32} />
                <p className="text-base text-gray-800 font-comfortaa font-bold leading-snug">
                  {t('home.motivation_quote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-white py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="AgriSmartAI" className="w-16 h-16 object-contain" />
                <span className="text-3xl font-bold tracking-tight">AgriSmartAI</span>
              </div>
              <p className="mt-6 text-gray-500 max-w-md text-lg font-light leading-relaxed">
                {t('home.footer_tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">{t('home.quick_links')}</h4>
              <ul className="space-y-4 text-gray-500">
                <li><button className="hover:text-primary transition-colors">{t('home.about_us')}</button></li>
                <li><button className="hover:text-primary transition-colors">{t('home.services')}</button></li>
                <li><button className="hover:text-primary transition-colors">{t('home.privacy_policy')}</button></li>
                <li><button className="hover:text-primary transition-colors">{t('home.contact_link')}</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">{t('home.contact')}</h4>
              <ul className="space-y-4 text-gray-500">
                <li>nagacharanvatupalli@gmail.com</li>
                <li>+91 78934 39082</li>
                <li>SRKR Engineering College, Bhimavaram</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} AgriSmartAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
