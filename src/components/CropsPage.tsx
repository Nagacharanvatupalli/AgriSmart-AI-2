import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Search, X, Copy, Check } from 'lucide-react';
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
    guidelines: string;
}

const crops: Crop[] = [
    {
        name: 'Paddy',
        season: 'KHARIF',
        seasonType: 'KHARIF',
        description: 'Paddy prefers clayey to silty loam soils with good water retention.',
        image: 'https://images.unsplash.com/photo-1512148173491-1999207ed165?q=80&w=800&auto=format&fit=crop',
        guidelines: "Cultivation Guidelines for Paddy:\n1. Soil: Requires clayey or loamy soil that can retain water.\n2. Sowing: Typically from June to July (Kharif).\n3. Water: Flooding of fields is necessary during growth.\n4. Harvest: Usually between November and December."
    },
    {
        name: 'Wheat',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'Wheat grows best in well-drained loamy soils with neutral pH.',
        image: 'https://images.unsplash.com/photo-1444858291040-58f756a3bea6?q=80&w=800&auto=format&fit=crop',
        guidelines: "Cultivation Guidelines for Wheat:\n1. Climate: Requires cool weather during growth and sunny weather for ripening.\n2. Sowing: October to December.\n3. Soil: Well-drained loamy to clayey soils are ideal.\n4. Fertilizer: Balanced NPK application is critical."
    },
    {
        name: 'Cotton',
        season: 'KHARIF',
        seasonType: 'KHARIF',
        description: 'Cotton needs deep, fertile soils and warm temperatures.',
        image: 'https://images.unsplash.com/photo-1594900572d41-3b7c46f6168e?q=80&w=800&auto=format&fit=crop',
        guidelines: "Cultivation Guidelines for Cotton:\n1. Soil: Black cotton soil (Regur) is best for moisture retention.\n2. Spacing: Maintain 60-90cm between rows.\n3. Pest Control: Monitor closely for Bollworm.\n4. Picking: Hand picking is done after bolls burst open."
    },
    {
        name: 'Chilli',
        season: 'RABI/KHARIF',
        seasonType: 'RABI/KHARIF',
        description: 'Chilli prefers well-drained loams.',
        image: 'https://images.unsplash.com/photo-1563865436914-44ee14a35e4b?q=80&w=800&auto=format&fit=crop',
        guidelines: "Cultivation Guidelines for Chilli:\n1. Nursery: Raise seedlings for 30-45 days before transplanting.\n2. Soil: Well-drained loamy soil with high organic matter.\n3. Irrigation: Frequent but light irrigation during flowering.\n4. Harvest: Green chillies can be picked after fully grown."
    },
    {
        name: 'Turmeric',
        season: 'KHARIF',
        seasonType: 'KHARIF',
        description: 'High yield spice with excellent medicinal value.',
        image: 'https://images.unsplash.com/photo-1615485240384-552d4c063b4b?q=80&w=800&auto=format&fit=crop',
        guidelines: "Cultivation Guidelines for Turmeric:\n1. Soil: Well-drained sandy or clayey loam.\n2. Planting: Raise on ridges by burying rhizomes.\n3. Duration: 7-9 months crop cycle.\n4. Processing: Boil, dry, and polish for marketing."
    },
    {
        name: 'Corn (Maize)',
        season: 'KHARIF/RABI',
        seasonType: 'KHARIF/RABI',
        description: 'Versatile crop suitable for many Indian climates.',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop',
        guidelines: "Cultivation Guidelines for Corn:\n1. Climate: Needs warm temperatures and good sunlight.\n2. Soil: Fertile alluvial soil is best.\n3. Weeding: Keep field clean during the first 30 days.\n4. Storage: Dry well to prevent fungal growth."
    },
    {
        name: 'Tomato',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'High-value fruit suitable for well-drained sandy loams.',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop',
        guidelines: "Cultivation Guidelines for Tomato:\n1. Support: Use staking for indeterminate varieties.\n2. Watering: Avoid overhead watering to reduce disease risk.\n3. Mulching: Helps in moisture retention and weed control.\n4. Pruning: Remove suckers to improve fruit size."
    },
    {
        name: 'Sugarcane',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'Heavy water consumer, suitable for fertile alluvial soil.',
        image: 'https://images.unsplash.com/photo-1614236961448-93630f9d9297?q=80&w=800&auto=format&fit=crop',
        guidelines: "Cultivation Guidelines for Sugarcane:\n1. Propagation: Done via stem cuttings called 'sets'.\n2. Soil: Deep well-drained clayey loams.\n3. Earthing up: Prevents lodging during high winds.\n4. Harvest: Cut close to the ground when sugar content peaks."
    },
    {
        name: 'Groundnut',
        season: 'KHARIF/RABI',
        seasonType: 'KHARIF/RABI',
        description: 'Oilseed crop that fixes nitrogen in the soil.',
        image: 'https://images.unsplash.com/photo-1563865436914-44ee14a35e4b?q=80&w=800&auto=format&fit=crop', // Reusing some images for bulk
        guidelines: "Guidelines: Sow in June/July. Requires light sandy-loam soil. Dig out pods when leaves turn yellow."
    },
    {
        name: 'Mustard',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'Main oilseed crop of Northern India.',
        image: 'https://images.unsplash.com/photo-1508748366405-b04f1414444b?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Sown in Oct-Nov. Cool climate preferred. Harvest when siliquae turn golden."
    },
    {
        name: 'Onion',
        season: 'RABI/KHARIF',
        seasonType: 'RABI/KHARIF',
        description: 'Essential bulb crop used in almost every kitchen.',
        image: 'https://images.unsplash.com/photo-1518977822534-7049a6fe407e?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Transplant 6-8 week old seedlings. Needs well-pulverized soil. Stop irrigation 15 days before harvest."
    },
    {
        name: 'Potato',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'The most important vegetable crop worldwide.',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Use certified disease-free seed tubers. Earthing up is essential for tuber development."
    },
    {
        name: 'Guava',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'Resilient fruit crop rich in vitamin C.',
        image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Prune annually to maintain tree shape. Drought tolerant once established."
    },
    {
        name: 'Mango',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'King of fruits, major export crop for India.',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Grafted varieties are preferred. Regular irrigation is vital during fruit development."
    },
    {
        name: 'Banana',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'Fast-growing fruit crop with high nutrition.',
        image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: High fertilizer and water requirement. Desuckering is necessary for better yields."
    },
    {
        name: 'Grapes',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'Vineyard crop used for table and wine.',
        image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Requires trellis system for support. Pruning is specialized (Oct and Dec-Jan)."
    },
    {
        name: 'Ginger',
        season: 'KHARIF',
        seasonType: 'KHARIF',
        description: 'Valuable spice with underground rhizomes.',
        image: 'https://images.unsplash.com/photo-1599307734111-92576974737d?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Thrives in partial shade. Needs organic-rich, well-drained soil."
    },
    {
        name: 'Garlic',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'Hardy bulb crop known for strong aroma.',
        image: 'https://images.unsplash.com/photo-1533470470213-9099e0483842?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Plant individual cloves. Cold temperatures promote bulb formation."
    },
    {
        name: 'Soybean',
        season: 'KHARIF',
        seasonType: 'KHARIF',
        description: 'High protein legume and oilseed.',
        image: 'https://images.unsplash.com/photo-1512148173491-1999207ed165?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Highly susceptible to weeds. Use pre-emergence herbicides."
    },
    {
        name: 'Chickpea (Chana)',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'Major pulse crop, critical for protein.',
        image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Grow on residual moisture. Sensitive to frost and drought at flowering."
    },
    {
        name: 'Black Gram (Urad)',
        season: 'KHARIF/RABI',
        seasonType: 'KHARIF/RABI',
        description: 'Nutritious pulse used in fermented foods.',
        image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Short duration crop (60-90 days). Fits well in many rotations."
    },
    {
        name: 'Green Gram (Moong)',
        season: 'KHARIF/RABI',
        seasonType: 'KHARIF/RABI',
        description: 'Versatile leguminous crop, easy to digest.',
        image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Can be grown as catch crop. Resistant to yellow mosaic virus is preferred."
    },
    {
        name: 'Pigeon Pea (Arhar)',
        season: 'KHARIF',
        seasonType: 'KHARIF',
        description: 'Long duration pulse, drought resistant.',
        image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Deep root system. Intercrop with sorghum or maize for best results."
    },
    {
        name: 'Lentil (Masoor)',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'Cool season pulse with high fiber.',
        image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Sown in late Oct. Requires cool climate and clear skies during maturity."
    },
    {
        name: 'Cabbage',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'Leafy vegetable suitable for cool regions.',
        image: 'https://images.unsplash.com/photo-1548685913-fe6574346a2a?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: High nitrogen feed is necessary. Control aphids early."
    },
    {
        name: 'Cauliflower',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'Popular flower vegetable, sensitive to temp.',
        image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fcd1?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Blanching (covering curd) is needed for white color. Sensitive to boron deficiency."
    },
    {
        name: 'Carrot',
        season: 'RABI',
        seasonType: 'RABI',
        description: 'Root vegetable rich in carotene.',
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Needs loose stone-free soil for straight roots. Thinning of seedlings is essential."
    },
    {
        name: 'Brinjal (Eggplant)',
        season: 'KHARIF/RABI',
        seasonType: 'KHARIF/RABI',
        description: 'Resilient vegetable crop with many varieties.',
        image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Needs well-drained loamy soil. Fruit borer is a major pest."
    },
    {
        name: 'Papaya',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'Quick producing fruit crop, nutrient dense.',
        image: 'https://images.unsplash.com/photo-1520037130283-bc015f8a0022?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Avoid waterlogging as it causes root rot. Sensitive to frost."
    },
    {
        name: 'Pomegranate',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'Drought hardy fruit crop with high value.',
        image: 'https://images.unsplash.com/photo-1541344999736-11f81498b31a?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Bahar treatment is given for flowering. Requires dry summer for fruit quality."
    },
    {
        name: 'Coffee',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'Major plantation crop of South India.',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Grows under shade trees. Requires alternate rain and sunshine (Oct-Nov blossoms)."
    },
    {
        name: 'Tea',
        season: 'PERENNIAL',
        seasonType: 'PERENNIAL',
        description: 'The world\'s most popular beverage crop.',
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800&auto=format&fit=crop',
        guidelines: "Guidelines: Thrives in high rainfall well-drained slopes. Plucking of two leaves and a bud is standard."
    }
];

export default function CropsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
    const [copied, setCopied] = useState(false);

    const filteredCrops = useMemo(() => {
        return crops.filter(crop =>
            crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crop.season.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="pt-24 pb-12 px-6 lg:px-10 max-w-[1600px] mx-auto min-h-screen bg-gray-50/50">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-[40px] font-bold text-gray-900 leading-tight">Crop Repository</h1>
                    <p className="text-gray-500 mt-2 text-lg">Expert guidance for {crops.length}+ high-yield cultivation of popular Indian crops.</p>
                </div>

                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by crop name or season..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[30px] shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredCrops.length > 0 ? (
                    filteredCrops.map((crop, idx) => (
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
                                    loading="lazy"
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

                                <button
                                    onClick={() => setSelectedCrop(crop)}
                                    className="mt-8 flex items-center gap-2 text-[#00ab55] font-black text-[10px] uppercase tracking-widest group/btn"
                                >
                                    VIEW GUIDELINES
                                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-gray-400 font-bold italic text-xl">No crops matching "{searchTerm}"</p>
                    </div>
                )}
            </div>

            {/* Guidelines Modal */}
            <AnimatePresence>
                {selectedCrop && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCrop(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
                        >
                            <div className="h-64 relative">
                                <img src={selectedCrop.image} alt={selectedCrop.name} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setSelectedCrop(null)}
                                    className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute bottom-6 left-10">
                                    <h2 className="text-4xl font-bold text-white drop-shadow-lg">{selectedCrop.name}</h2>
                                    <span className="text-white/80 font-bold uppercase tracking-widest text-xs">{selectedCrop.season} SEASON</span>
                                </div>
                            </div>

                            <div className="p-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Cultivation Guidelines</h4>
                                    <button
                                        onClick={() => handleCopy(selectedCrop.guidelines)}
                                        className="flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-600 font-bold text-xs uppercase tracking-widest transition-all"
                                    >
                                        {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                        {copied ? 'COPIED!' : 'COPY GUIDELINES'}
                                    </button>
                                </div>

                                <div className="bg-slate-50 border border-slate-100 p-8 rounded-[30px] whitespace-pre-wrap text-gray-600 leading-relaxed font-medium">
                                    {selectedCrop.guidelines}
                                </div>

                                <button
                                    onClick={() => setSelectedCrop(null)}
                                    className="w-full mt-10 py-5 bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                                >
                                    BACK TO REPOSITORY
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
