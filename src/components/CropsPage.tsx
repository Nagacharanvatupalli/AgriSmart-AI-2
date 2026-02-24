import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Crop {
    name: string;
    season: string;
    description: string;
    image: string;
    seasonType: 'KHARIF' | 'RABI' | 'KHARIF/RABI' | 'RABI/KHARIF' | 'PERENNIAL';
}

const crops: Crop[] = [
    {
        name: 'Paddy',
        season: 'KHARIF',
        seasonType: 'KHARIF',
        description: 'Paddy prefers clayey to silty loam soils with good water retention.',
        image: 'https://images.unsplash.com/photo-1512148173491-1999207ed165?q=80&w=800&auto=format&fit=crop'
    },
    {
        name: 'Wheat',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'Wheat grows best in well-drained loamy soils with neutral pH.',
        image: 'https://images.unsplash.com/photo-1444858291040-58f756a3bea6?q=80&w=800&auto=format&fit=crop'
    },
    {
        name: 'Cotton',
        season: 'KHARIF',
        seasonType: 'KHARIF',
        description: 'Cotton needs deep, fertile soils and warm temperatures.',
        image: 'https://images.unsplash.com/photo-1594900572d41-3b7c46f6168e?q=80&w=800&auto=format&fit=crop'
    },
    {
        name: 'Chilli',
        season: 'RABI/KHARIF',
        seasonType: 'RABI/KHARIF',
        description: 'Chilli prefers well-drained loams.',
        image: 'https://images.unsplash.com/photo-1563865436914-44ee14a35e4b?q=80&w=800&auto=format&fit=crop'
    },
    {
        name: 'Turmeric',
        season: 'KHARIF',
        seasonType: 'KHARIF',
        description: 'High yield spice with excellent medicinal value.',
        image: 'https://images.unsplash.com/photo-1615485240384-552d4c063b4b?q=80&w=800&auto=format&fit=crop'
    },
    {
        name: 'Corn',
        season: 'KHARIF/RABI',
        seasonType: 'KHARIF/RABI',
        description: 'Versatile crop suitable for many Indian climates.',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop'
    },
    {
        name: 'Tomato',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'High-value fruit suitable for well-drained sandy loams.',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop'
    },
    {
        name: 'Sugarcane',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'Heavy water consumer, suitable for fertile alluvial soil.',
        image: 'https://images.unsplash.com/photo-1614236961448-93630f9d9297?q=80&w=800&auto=format&fit=crop'
    }
];

export default function CropsPage() {
    return (
        <div className="pt-24 pb-12 px-6 lg:px-10 max-w-[1600px] mx-auto min-h-screen bg-gray-50/50">
            <div className="mb-12">
                <h1 className="text-[40px] font-bold text-gray-900 leading-tight">Crop Repository</h1>
                <p className="text-gray-500 mt-2 text-lg">Expert guidance for high-yield cultivation of popular Indian crops.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {crops.map((crop, idx) => (
                    <motion.div
                        key={crop.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={crop.image}
                                alt={crop.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4">
                                <span className={cn(
                                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg",
                                    crop.seasonType === 'KHARIF' ? "bg-orange-500" :
                                        crop.seasonType === 'RABI' ? "bg-blue-500" :
                                            crop.seasonType === 'PERENNIAL' ? "bg-purple-500" :
                                                "bg-green-600"
                                )}>
                                    {crop.season}
                                </span>
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{crop.name}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed min-h-[48px] line-clamp-2">
                                {crop.description}
                            </p>

                            <button className="mt-8 flex items-center gap-2 text-[#00ab55] font-black text-[10px] uppercase tracking-widest group/btn">
                                VIEW GUIDELINES
                                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
