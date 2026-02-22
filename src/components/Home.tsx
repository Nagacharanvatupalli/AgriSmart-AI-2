import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Target, Lightbulb, ChevronRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
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
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-left max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-8xl font-serif text-white mb-8 leading-[0.9] italic font-light"
          >
            "The discovery of agriculture was the first big step toward a civilized life."
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-start gap-4"
          >
            <button 
              onClick={() => onNavigate('crops')}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/20 transition-all transform hover:scale-105"
            >
              Crops
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-primary text-white px-12 py-4 rounded-xl text-lg font-bold hover:bg-primary-dark transition-all transform hover:scale-105 flex items-center gap-2 shadow-xl shadow-primary/20"
            >
              Get Started
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
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Project Information</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-xl font-light">
                AgriSmart AI is a cutting-edge platform designed to empower farmers with the latest advancements in Artificial Intelligence and Machine Learning. Our system provides real-time insights, precise crop diagnosis, and personalized agricultural advice to optimize yields and promote sustainable farming practices globally.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-6 border border-gray-100 rounded-3xl bg-gray-50/50">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">AI Diagnosis</h4>
                  <p className="text-sm text-gray-500">Instant disease detection using computer vision</p>
                </div>
                <div className="p-6 border border-gray-100 rounded-3xl bg-gray-50/50">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Market Data</h4>
                  <p className="text-sm text-gray-500">Real-time global commodity price tracking</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Target size={28} />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Our Motivation</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-xl font-light">
                The motivation behind AgriSmart AI stems from the urgent need to address global food security challenges. By bridging the gap between traditional farming wisdom and modern technology, we aim to reduce crop loss, minimize chemical usage, and increase the economic stability of farming communities worldwide.
              </p>
              <div className="flex items-start gap-6 p-8 bg-primary/5 rounded-[40px] border border-primary/10">
                <Lightbulb className="text-primary shrink-0 mt-1" size={32} />
                <p className="text-lg italic text-gray-700 font-serif">
                  "Empowering the hands that feed the world through intelligent, accessible technology."
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
              <span className="text-3xl font-bold tracking-tight">AgriSmart <span className="text-primary">AI</span></span>
              <p className="mt-6 text-gray-500 max-w-md text-lg font-light leading-relaxed">
                Revolutionizing agriculture through smart technology and data-driven insights. We believe in a future where every farmer has an expert in their pocket.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4 text-gray-500">
                <li><button className="hover:text-primary transition-colors">About Us</button></li>
                <li><button className="hover:text-primary transition-colors">Services</button></li>
                <li><button className="hover:text-primary transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-primary transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Contact</h4>
              <ul className="space-y-4 text-gray-500">
                <li>info@agrismart.ai</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Farm Road, Silicon Valley</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} AgriSmart AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
