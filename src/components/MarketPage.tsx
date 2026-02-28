import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Search,
    TrendingUp,
    TrendingDown,
    Minus,
    MapPin,
    Calendar,
    ArrowUpRight,
    Loader2,
    Filter,
    ArrowRight,
    AlertCircle,
    BarChart3,
    ArrowUp,
    ArrowDown,
    ChevronDown,
    Mic,
    Phone,
    Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ttsService } from '../services/ttsService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ALL_MARKETS } from '../data/markets';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MarketData {
    commodity: string;
    market: string;
    is_primary: boolean;
    state: string;
    district: string;
    grade1_price: number;
    grade2_price: number;
    grade3_price: number;
    modal_price: number;
    date: string;
    trend: 'up' | 'down' | 'stable';
    source: string;
    previous_modal_price?: number;
    previous_date?: string;
    percentage_change?: string;
    actual_trend?: 'up' | 'down' | 'stable';
}

const ALL_COMMODITIES = [
    'Ajwain Husk', 'Ajwan', 'Almond(Badam)', 'Aloe Vera', 'Alsandikai', 'Amaranthus', 'Ambat Chuka',
    'Ambady/Mesta/Patson', 'Amla(Nelli Kai)', 'Amranthas Red', 'Anthorium', 'Apple', 'Apricot(Jardalu/Khumani)',
    'Arecanut(Betelnut/Supari)', 'Arrowroot', 'Asalia', 'Asgand', 'Ashgourd', 'Ashoka', 'Ashwagandha',
    'Asparagus', 'Astera', 'Atis', 'Avocado', 'Baby Corn', 'Bael', 'Bajji chilli', 'Bajra(Pearl Millet/Cumbu)',
    'Balekai', 'balsam', 'Bamboo Shoot', 'Banana', 'Banana - Green', 'Banana flower', 'Banana Leaf',
    'Banana stem', 'Barley(Jau)', 'Barnyard Millet', 'basil', 'Beaten Rice', 'Beetroot', 'Ber(Zizyphus/Borehannu)',
    'Betal Leaves', 'Betelnuts', 'Bhindi(Ladies Finger)', 'Bilimbi', 'Binoula', 'Bitter gourd',
    'Black Currant', 'Black pepper', 'Blueberry', 'BOP', 'Borehannu', 'Bottle gourd', 'Bran',
    'Bread Fruit', 'Brinjal', 'Brocoli', 'Broken Rice', 'Browntop Millet', 'Bunch Beans', 'Cabbage',
    'Calendula', 'Camel Hair', 'Capsicum', 'Cardamoms', 'Carnation', 'Carissa(Karvand)', 'Carrot',
    'Cashew Kernnel', 'Cashew nuts', 'Castor Seed', 'Cauliflower', 'Chakhao(Black Rice)', 'Chakotha',
    'Chandrashoor', 'Chapparad Avare', 'Chhappan Kaddu', 'Cherry', 'Chicory(Chikori/Kasni)', 'Chikoos(Sapota)',
    'Chili Red', 'Chilly Capsicum', 'Chrysanthemum', 'Chrysanthemum(Loose)', 'Cinamon(Dalchini)', 'cineraria',
    'Clarkia', 'Cluster beans', 'Cloves', 'Coca', 'Cocoa', 'Coconut', 'Coconut Coir', 'Coconut Seed',
    'Coffee', 'Colacasia', 'Coleus', 'Copra', 'Coriander(Leaves)', 'Corriander seed', 'Cossandra',
    'Cotton', 'Cotton Seed', 'Cowpea(Veg)', 'Cucumbar(Kheera)', 'Cummin Seed(Jeera)', 'Curry Leaf',
    'Custard Apple(Sharifa)', 'Daila(Chandni)', 'Dates', 'Delha', 'Delha', 'dhawai flowers', 'Dhaincha',
    'Dhaincha(Seed)', 'dianthus', 'Double Beans', 'Dragon fruit', 'dried mango', 'Drumstick', 'Dry Chillies',
    'Dry Fodder', 'Dry Grapes', 'Duster Beans', 'Egypian Clover(Barseem)', 'Elephant Yam(Suran)/Amorphophallus',
    'Field Bean(Anumulu)', 'Field Pea', 'Fig (Dry)', 'Fig(Anjura/Anjeer)', 'Flax seeds', 'Flowers-Others',
    'Foxtail Millet(Navane)', 'French Beans(Frasbean)', 'Galgal(Lemon)', 'Gamphrena', 'Garcinia', 'Garlic',
    'Gerbera', 'Gherkin', 'Ghost Pepper(King Chilli)', 'Ginger Seed', 'Ginger(Dry)', 'Ginger(Green)',
    'Gladiolus Bulb', 'Gladiolus Cut Flower', 'Glardia', 'Goat Hair', 'golden rod', 'Goose berry(Nellikkai)',
    'Goosefoot', 'Gramflour', 'Gram Raw(Chholia)', 'Grapes', 'Green Avare(W)', 'Green Chilli',
    'Green Fodder', 'Green Tea', 'Grey Fruit', 'Ground Nut Seed', 'Groundnut', 'Groundnut pods(raw)',
    'Groundnut(Split)', 'Guar', 'Guava', 'Gur(Jaggery)', 'Gurellu', 'gypsophila', 'Haralekai', 'Heliconia species',
    'Hilsa', 'Hog Plum', 'Honey', 'Honge seed', 'hybrid Cumbu', 'hydrangea', 'Indian Beans(Seam)',
    'Indian Colza(Sarson)', 'Indian Sherbet Berry(Phalsa)', 'Irish', 'Isabgul(Psyllium)', 'Isbgol', 'Jack Fruit(Ripe)',
    'Jackfruit Seed', 'Jackfruit(Green/Raw/Unripe)', 'Jaee', 'Jaffri', 'Jaggery', 'Jamamkhan', 'Jamun(Narale Hannu)',
    'Jarbara', 'Jasmine', 'Javi', 'Jowar(Sorghum)', 'Jute', 'Kacholam', 'Kagda', 'Kakada', 'kakatan', 'Kankambra',
    'karanja seeds', 'Karbuja(Musk Melon)', 'Kartali(Kantola)', 'Kevda', 'Kharif Mash', 'Khirni', 'Khoya', 'Kinnow',
    'Kiwi Fruit', 'Knool Khol', 'Kodo Millet(Varagu)', 'Kuchur', 'Kuchur - Kusum Seed', 'Kutki', 'Ladies Finger',
    'Laha', 'Large Cardamom', 'Leafy Vegetable', 'Leek', 'Lemon', 'Lemongrass', 'Lesser Yam', 'Lilly', 'Lime',
    'Limonia(status)', 'Linseed', 'Lint', 'liquor turmeric', 'Litchi', 'Little gourd(Kundru)', 'Little Millet',
    'Long Melon(Kakri)', 'Lotus', 'Lotus Sticks', 'Lukad', 'Lupine', 'Ma.Inji', 'Mace', 'macoy', 'Mahedi', 'Mahua',
    'Maida Atta', 'Maize', 'Makhana(Foxnut)', 'mango powder', 'Mango', 'Mango(Raw-Ripe)', 'Mangosteen',
    'Maragensu', 'Marasebu', 'Marget', 'Marigold(Calcutta)', 'Marigold(loose)', 'Marikozhunthu', 'Mash', 'Mashrooms',
    'Meal Maker (Soya Chunks)', 'MENETC*3', 'Mentha Oil', 'Mentha(Mint)', 'Methi Seeds', 'Methi(Leaves)', 'Millets',
    'Mint(Pudina)', 'Mousambi(Sweet Lime)', 'Muesli', 'Muleti', 'Mulberry', 'Mustard', 'Muskmelon Seeds',
    'Myrobolan(Harad)', 'Nearle Hannu', 'Neem Fruits', 'Nelli Kai', 'Nerium', 'nigella', 'nigella seeds',
    'Niger Seed(Ramtil)', 'Nutmeg', 'Onion', 'Onion Green', 'Orange', 'Orchid', 'Other green and fresh vegetables',
    'Paddy(Basmati)', 'Paddy(Common)', 'Palash flowers', 'Papaya', 'Papaya(Raw)', 'Passion Fruit',
    'Patti Calcutta', 'Peach', 'Pea Pod/Pea Cod/हरी मटर', 'Pear(Marasebu)', 'Peas Wet', 'Pincushion Flower',
    'Pine Nut(Chilgoza /Niyoza)', 'Pineapple', 'pippali', 'Pista(Pistachio)', 'Plum', 'Pointed gourd(Parval)',
    'Pokcha Leafy Veg', 'Polherb', 'Pomegranate', 'Poppy capsules', 'poppy seeds', 'Potato', 'Proso Millet',
    'Pumpkin', 'Pundi', 'Pupadia', 'Purslane', 'Quince(Nakh)', 'Rab/Liquid Jaggery/Molasses', 'Raddish', 'Ragi(Finger Millet)',
    'Raibel', 'Rajgir', 'Rala', 'Rambutan', 'Ramphal', 'Rat Tail Radish(Mogari)', 'Raw Biomass(Agro Residue)',
    'Raya', 'Rayee', 'Red Cabbage', 'Red Gourd', 'Ribbed Celery', 'Riccbcan', 'Rice', 'Ridge Gourd(Permal/Hybrid Gourd)',
    'Ridgeguard(Tori)', 'Rose(Local)', 'Rose(Loose))', 'Rose(Tata)', 'Round Chilli', 'Round gourd', 'Rubber',
    'Sabu Dan', 'Safflower', 'Saffron', 'Sajje', 'Sal Seeds', 'salvia', 'Same/Savi', 'Sanai/Sunhemp', 'sanay',
    'Sarasum', 'Season Leaves', 'Seegu', 'Seemebadnekai', 'Seetapal', 'Sehuwan (Seed)', 'Sem', 'Sesamum(Sesame,Gingelly,Til)',
    'sevanti', 'Siddota', 'Siru Kizhagu', 'Skin And Hide', 'Snakeguard', 'Snow Mountain Garlic', 'Soanf', 'Soha',
    'Soji', 'Sompu', 'Soursop', 'Soyabean', 'Spinach', 'Sponge gourd', 'Squash(Chappal Kadoo)', 'Star Fruit(Kamraikh)',
    'stevia', 'stone pulverizer', 'Strawberry', 'Sugar', 'Sugar Snap Peas', 'Sugarcane', 'Sunflower', 'Sunflower Seed',
    'Suram', 'Surat Beans(Papadi)', 'Suva(Dill Seed)', 'Suvarna Gadde', 'Swan Phali(Flat Bean)', 'Swan Plant (Green Herb)',
    'Swanflower', 'Sweet Corn', 'Sweet Potato', 'Sweet Pumpkin', 'Sweet Saag', 'Sweet Sultan', 'sweet william',
    'T.V. Cumbu', 'Tapioca', 'Taramira', 'Taro (Arvi) Leaves', 'Taro (Arvi) Stem', 'Tea', 'Tender Coconut',
    'Tendu Leaves/Kendu leaves/Bidi Leaves', 'Thogrikai', 'Thondekai', 'Tinda', 'Tobacco', 'Tomato', 'Toria',
    'Tube Flower', 'Tube Rose(Double)', 'Tube Rose(Loose)', 'Tube Rose(Single)', 'Tulasi', 'tulip', 'Turmeric',
    'Turmeric(raw)', 'Turnip', 'vadang', 'Vatsanabha', 'Walnut', 'Water Apple', 'Water chestnut', 'Water Melon',
    'Water Plant(Kaseru)', 'Wheat', 'Wheat Atta', 'White Muesli', 'White Pumpkin', 'Wild Cucumber', 'Wild Garlic / Shoots',
    'Wild lemon', 'Wild Melon', 'Wild Spinach', 'Wood Apple', 'Wool', 'Yam', 'Yam Bean / Mexican Turnip(Bankla)',
    'Yam(Ratalu)'
];

import commodityTranslations from '../data/commodity_translations.json';
import marketTranslations from '../data/market_translations.json';
import locationTranslations from '../data/location_translations.json';
import marketContacts from '../data/market_contacts.json';

export default function MarketPage() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    const getTranslatedCommodity = (crop: string) => {
        if (currentLang === 'en') return crop;
        // @ts-ignore - dynamic key access
        return commodityTranslations[currentLang]?.[crop] || crop;
    };

    const getTranslatedMarket = (market: string) => {
        if (!market || currentLang === 'en') return market;
        // @ts-ignore - dynamic key access
        const translated = marketTranslations[currentLang]?.[market];
        // Only return if it's actually different (skip identity mappings in JSON)
        if (translated && translated !== market) return translated;

        // Fallback to location translations (many markets are named after cities/districts)
        return getTranslatedLocation(market);
    };

    const getTranslatedLocation = (location: string) => {
        if (!location || currentLang === 'en') return location;
        // @ts-ignore - dynamic key access
        const langData = locationTranslations[currentLang];
        if (!langData) return location;

        // Normalize for Case Insensitivity (e.g. "ALLAHABAD" -> "Allahabad")
        const titleCase = location.toLowerCase().split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        return langData.states?.[location] ||
            langData.districts?.[location] ||
            langData.states?.[titleCase] ||
            langData.districts?.[titleCase] ||
            location;
    };

    const getMarketContact = (marketName: string) => {
        // @ts-ignore - dynamic key access
        return marketContacts[marketName] || null;
    };

    const [searchMarket, setSearchMarket] = useState(() => localStorage.getItem('market_location') || 'Guntur');
    const [marketSearchInput, setMarketSearchInput] = useState(searchMarket);
    const [showMarketDropdown, setShowMarketDropdown] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(() => localStorage.getItem('market_selectedCrop') || '');
    const [cropSearch, setCropSearch] = useState('');
    const [marketData, setMarketData] = useState<MarketData[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [isListeningCrop, setIsListeningCrop] = useState(false);

    const startListening = () => {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech Recognition is not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = currentLang === 'te' ? 'te-IN' : currentLang === 'hi' ? 'hi-IN' : currentLang === 'ta' ? 'ta-IN' : 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setMarketSearchInput(transcript);
            setShowMarketDropdown(true);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const startListeningCrop = () => {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech Recognition is not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = currentLang === 'te' ? 'te-IN' : currentLang === 'hi' ? 'hi-IN' : currentLang === 'ta' ? 'ta-IN' : 'en-US';

        recognition.onstart = () => {
            setIsListeningCrop(true);
        };

        recognition.onresult = (event: any) => {
            let transcript = event.results[0][0].transcript;
            if (transcript.endsWith('.')) { transcript = transcript.slice(0, -1); }
            setCropSearch(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListeningCrop(false);
        };

        recognition.onend = () => {
            setIsListeningCrop(false);
        };

        recognition.start();
    };


    const filteredMarkets = ALL_MARKETS
        .filter(m => {
            const englishMatch = m.toLowerCase().includes(marketSearchInput.toLowerCase());
            const translatedMatch = getTranslatedMarket(m).toLowerCase().includes(marketSearchInput.toLowerCase());
            return englishMatch || translatedMatch;
        })
        .slice(0, 100);

    // Sync input text with selected market translation when language changes
    useEffect(() => {
        if (searchMarket) {
            setMarketSearchInput(getTranslatedMarket(searchMarket));
        }
    }, [currentLang, searchMarket]);

    const filteredCommodities = Array.from(new Set(ALL_COMMODITIES
        .filter(crop => {
            const translatedName = getTranslatedCommodity(crop);
            return translatedName.toLowerCase().includes(cropSearch.toLowerCase()) ||
                crop.toLowerCase().includes(cropSearch.toLowerCase());
        })))
        .sort((a, b) => {
            if (a === selectedCrop) return -1;
            if (b === selectedCrop) return 1;
            return 0;
        });

    const fetchMarketPrices = async (crop: string, market: string) => {
        if (!crop) return;

        const token = localStorage.getItem('token');
        if (!token) {
            setError(t('market.no_location_error'));
            return;
        }

        setIsLoading(true);
        setError(null);
        setMarketData(null);
        try {
            const response = await fetch(`/api/market/prices?crop=${encodeURIComponent(crop)}&market=${encodeURIComponent(market || 'India')}`, {
                headers: { 'x-auth-token': token }
            });
            if (!response.ok) throw new Error('Failed to connect to market node');

            const data = await response.json();

            if (!Array.isArray(data) || data.length === 0) {
                throw new Error(t('market.no_data_error'));
            }

            setMarketData(data);
        } catch (err: any) {
            setError(err.message || t('market.no_data_error'));
        } finally {
            setIsLoading(false);
        }
    };

    // Persist selected crop and market to localStorage
    useEffect(() => {
        if (selectedCrop) localStorage.setItem('market_selectedCrop', selectedCrop);
    }, [selectedCrop]);

    useEffect(() => {
        if (searchMarket) localStorage.setItem('market_location', searchMarket);
    }, [searchMarket]);

    const primaryMarket = marketData && marketData.length > 0
        ? (marketData.find(m => m.is_primary) || marketData[0])
        : null;

    // Auto-fetch on mount if a crop was previously selected
    useEffect(() => {
        if (selectedCrop) {
            fetchMarketPrices(selectedCrop, searchMarket);
        }
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCrop) {
            fetchMarketPrices(selectedCrop, searchMarket);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-[#f8fafb] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ab55]/5 rounded-full -mr-64 -mt-64 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full -ml-64 -mb-64 blur-3xl -z-10" />

            <div className="max-w-[1400px] mx-auto">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ab55]/10 text-[#00ab55] w-fit">
                            <TrendingUp size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{t('market.badge')}</span>
                        </div>
                        <h1 className="text-5xl font-bold text-[#0a2635] tracking-tight">{t('market.title')}</h1>
                        <p className="text-gray-500 font-medium italic">{t('market.subtitle')}</p>
                    </div>

                    <form onSubmit={handleSearch} className="flex gap-3 w-full lg:max-w-xl relative">
                        <div className="relative flex-1 group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00ab55] transition-colors">
                                <MapPin size={20} />
                            </div>
                            <input
                                type="text"
                                value={marketSearchInput}
                                onChange={(e) => {
                                    setMarketSearchInput(e.target.value);
                                    setShowMarketDropdown(true);
                                }}
                                onFocus={() => setShowMarketDropdown(true)}
                                placeholder={t('market.search_placeholder')}
                                className="w-full pl-14 pr-24 py-4 bg-white border border-gray-100 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-[#00ab55]/5 focus:border-[#00ab55]/20 transition-all font-semibold text-gray-700 shadow-sm"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); startListening(); }}
                                    className={cn("transition-colors p-2 rounded-full", isListening ? "bg-red-50 text-red-500 animate-pulse" : "text-gray-400 hover:text-[#00ab55] hover:bg-[#00ab55]/5")}
                                >
                                    <Mic size={18} />
                                </button>
                                <ChevronDown size={20} className={cn("transition-transform duration-200 text-gray-400", showMarketDropdown && "rotate-180")} />
                            </div>

                            <AnimatePresence>
                                {showMarketDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowMarketDropdown(false)}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-[24px] shadow-2xl z-20 max-h-[300px] overflow-y-auto custom-scrollbar overflow-x-hidden"
                                        >
                                            {filteredMarkets.length > 0 ? (
                                                filteredMarkets.map((market) => (
                                                    <button
                                                        key={market}
                                                        type="button"
                                                        onClick={() => {
                                                            setSearchMarket(market);
                                                            setMarketSearchInput(getTranslatedMarket(market));
                                                            setShowMarketDropdown(false);
                                                            if (selectedCrop) fetchMarketPrices(selectedCrop, market);
                                                        }}
                                                        className="w-full text-left px-6 py-3 hover:bg-[#00ab55]/5 text-sm font-semibold text-gray-700 transition-colors flex items-center gap-3"
                                                    >
                                                        <MapPin size={14} className="text-gray-300" />
                                                        {getTranslatedMarket(market)}
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-6 py-4 text-center text-gray-400 text-sm font-medium">
                                                    {t('market.no_markets_found', 'No markets found')}
                                                </div>
                                            )}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#0a2635] text-white px-8 py-4 rounded-[24px] font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                            <span className="hidden sm:inline">{t('market.analyze')}</span>
                        </button>
                    </form>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Filter Sidebar */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <Filter size={18} className="text-[#00ab55]" />
                                <h3 className="text-sm font-bold text-black uppercase tracking-widest">{t('market.select_commodity')}</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="relative group">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00ab55] transition-colors" />
                                    <input
                                        type="text"
                                        placeholder={t('market.search_commodity')}
                                        value={cropSearch}
                                        onChange={(e) => setCropSearch(e.target.value)}
                                        className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#00ab55]/5 focus:border-[#00ab55]/20 transition-all font-semibold text-xs"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); startListeningCrop(); }}
                                        className={cn("absolute right-2 top-1/2 -translate-y-1/2 transition-colors p-1.5 rounded-full flex items-center justify-center", isListeningCrop ? "bg-red-50 text-red-500 animate-pulse" : "text-gray-400 hover:text-[#00ab55] hover:bg-[#00ab55]/5")}
                                    >
                                        <Mic size={14} />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {filteredCommodities.map(crop => (
                                        <button
                                            key={crop}
                                            onClick={() => {
                                                setSelectedCrop(crop); // Keep original english name as value
                                                fetchMarketPrices(crop, searchMarket);
                                                const translated = getTranslatedCommodity(crop);
                                                ttsService.speak(translated, i18n.language);
                                            }}
                                            className={cn(
                                                "flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer",
                                                selectedCrop === crop
                                                    ? "bg-[#00ab55]/5 text-[#00ab55] border border-[#00ab55]/20 ring-1 ring-[#00ab55]/10"
                                                    : "text-gray-500 hover:bg-gray-50 border border-transparent"
                                            )}
                                        >
                                            <span className="truncate">{getTranslatedCommodity(crop)}</span>
                                            {selectedCrop === crop && <ArrowRight size={14} className="flex-shrink-0" />}
                                        </button>
                                    ))}
                                    {filteredCommodities.length === 0 && (
                                        <div className="py-8 text-center">
                                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{t('market.no_matching_crops')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 space-y-8">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-[500px] flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-gray-100"
                                >
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-[#00ab55]/10 border-t-[#00ab55] rounded-full animate-spin" />
                                        <TrendingUp className="absolute inset-0 m-auto text-[#00ab55]" size={24} />
                                    </div>
                                    <p className="mt-6 text-[#00ab55] font-black text-[10px] uppercase tracking-[0.3em]">{t('market.querying')}</p>
                                </motion.div>
                            ) : error ? (
                                <motion.div
                                    key="no-data"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="h-[500px] flex flex-col items-center justify-center bg-white rounded-[40px] border border-gray-100 p-12 text-center shadow-sm"
                                >
                                    <div className="w-20 h-20 bg-[#00ab55]/5 rounded-[32px] flex items-center justify-center text-[#00ab55] mb-8">
                                        <MapPin size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0a2635] mb-3">{t('market.no_data_found')}</h3>
                                    <p className="text-gray-400 font-medium max-w-md mb-2 leading-relaxed">
                                        {t('market.no_data_desc_1', 'Price predictions for')} <span className="font-bold text-[#0a2635]">{getTranslatedCommodity(selectedCrop)}</span> {t('market.no_data_desc_2', 'are currently not available at')} <span className="font-bold text-[#0a2635]">{searchMarket ? getTranslatedMarket(searchMarket) : t('market.this_location', 'this location')}</span>.
                                    </p>
                                    <p className="text-gray-400 text-sm italic max-w-sm mb-10">
                                        {t('market.try_another_search', 'Try searching for a different commodity or another market location.')}
                                    </p>
                                    <button
                                        onClick={() => fetchMarketPrices(selectedCrop, searchMarket)}
                                        className="bg-[#0a2635] text-white px-10 py-4 rounded-[24px] font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center gap-3"
                                    >
                                        <Search size={16} />
                                        {t('market.try_again_btn', 'TRY AGAIN')}
                                    </button>
                                </motion.div>
                            ) : primaryMarket ? (
                                <motion.div
                                    key="data"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    {/* Summary Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <PriceStat
                                            label={t('market.grade1_price', 'Grade 1 Price')}
                                            price={primaryMarket.grade1_price}
                                            sub={t('market.grade1_quality', 'Premium Quality (per 100kg)')}
                                            trend="stable"
                                            icon={<ArrowUp className="text-[#00ab55]" size={24} />}
                                            highlight
                                            lang={i18n.language}
                                        />
                                        <PriceStat
                                            label={t('market.grade2_price', 'Grade 2 Price')}
                                            price={primaryMarket.grade2_price}
                                            sub={t('market.grade2_quality', 'Standard Quality (per 100kg)')}
                                            trend="stable"
                                            icon={<Minus className="text-blue-500" size={24} />}
                                            lang={i18n.language}
                                        />
                                        <PriceStat
                                            label={t('market.grade3_price', 'Grade 3 Price')}
                                            price={primaryMarket.grade3_price}
                                            sub={t('market.grade3_quality', 'Lower Quality (per 100kg)')}
                                            trend="down"
                                            icon={<ArrowDown className="text-red-400" size={24} />}
                                            lang={i18n.language}
                                        />
                                    </div>

                                    {/* Market Details Card */}
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        <div className="flex-1 bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
                                            <div className="w-full flex flex-col md:flex-row items-start justify-between gap-6">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('market.selected_market')}</p>
                                                    <h3 className="text-3xl font-bold text-[#0a2635] tracking-tight">{getTranslatedMarket(primaryMarket.market)}</h3>
                                                </div>
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                                        <MapPin className="text-gray-400" size={20} />
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{t('market.location')}</p>
                                                            <p className="text-sm font-bold text-gray-700">{getTranslatedLocation(primaryMarket.district)}, {getTranslatedLocation(primaryMarket.state)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                                        <Calendar className="text-gray-400" size={20} />
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">{t('market.last_update')}</p>
                                                            <p className="text-sm font-bold text-gray-700">{new Date(primaryMarket.date).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    {getMarketContact(primaryMarket.market) && (
                                                        <a
                                                            href={`tel:${getMarketContact(primaryMarket.market)!.phone}`}
                                                            className="flex items-center gap-3 p-4 rounded-2xl bg-[#00ab55]/5 border border-[#00ab55]/10 hover:bg-[#00ab55]/10 transition-colors cursor-pointer group"
                                                        >
                                                            <div className="w-10 h-10 bg-[#00ab55]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00ab55]/20 transition-colors">
                                                                <Phone className="text-[#00ab55]" size={18} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-[10px] font-bold text-[#00ab55] uppercase leading-none mb-1">{t('market.market_contact', 'Market Contact')}</p>
                                                                <p className="text-sm font-bold text-[#0a2635] truncate">{getMarketContact(primaryMarket.market)!.head}</p>
                                                                <p className="text-[10px] text-gray-400 font-medium">{getMarketContact(primaryMarket.market)!.role}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-sm font-bold text-[#00ab55]">{getMarketContact(primaryMarket.market)!.phone}</p>
                                                            </div>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const text = `${t('market.selected_market')}: ${getTranslatedMarket(primaryMarket.market)}. ${t('market.location')}: ${getTranslatedLocation(primaryMarket.district)}, ${getTranslatedLocation(primaryMarket.state)}.`;
                                                    ttsService.speak(text, i18n.language);
                                                }}
                                                className="mt-6 flex items-center gap-2 text-xs font-bold text-[#00ab55]/60 hover:text-[#00ab55] transition-colors"
                                            >
                                                <Volume2 size={14} />
                                                {t('market.speak_details', 'Listen to market details')}
                                            </button>
                                        </div>

                                        {/* Nearby Markets Side Panel */}
                                        {marketData.length > 1 && (
                                            <div className="w-full lg:w-80 bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-2">{t('market.nearby_markets')}</h4>
                                                <div className="space-y-4">
                                                    {marketData.filter(m => !m.is_primary).map((m, i) => (
                                                        <div key={i} className="p-4 rounded-[24px] bg-gray-50 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <p className="text-sm font-bold text-[#0a2635] leading-tight">{getTranslatedMarket(m.market)}</p>
                                                                <span className={cn(
                                                                    "text-[8px] font-black px-1.5 py-0.5 rounded-full",
                                                                    parseFloat(m.percentage_change || '0') >= 0 ? "bg-[#00ab55]/10 text-[#00ab55]" : "bg-red-50 text-red-500"
                                                                )}>
                                                                    {parseFloat(m.percentage_change || '0') >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(m.percentage_change || '0'))}%
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-end">
                                                                <p className="text-[10px] text-gray-400 font-medium">{getTranslatedLocation(m.district)}</p>
                                                                <p className="text-lg font-black text-[#00ab55]">₹{m.grade1_price} <span className="text-[10px] text-gray-400 font-normal ml-1">/ 100kg</span></p>
                                                            </div>
                                                            {getMarketContact(m.market) && (
                                                                <a href={`tel:${getMarketContact(m.market)!.phone}`} className="mt-2 flex items-center gap-2 text-[10px] text-[#00ab55] font-semibold hover:underline">
                                                                    <Phone size={10} />
                                                                    {getMarketContact(m.market)!.phone} — {getMarketContact(m.market)!.head}
                                                                </a>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-[500px] flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-gray-100 p-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-[#00ab55]/5 rounded-[32px] flex items-center justify-center text-[#00ab55] mb-8">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0a2635] mb-3">{t('market.begin_search_title', 'Begin Your Market Search')}</h3>
                                    <p className="text-gray-400 font-medium italic max-w-sm">
                                        {t('market.begin_search_desc', 'Select a commodity from the sidebar to view live wholesale prices and historical trends across Indian markets.')}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PriceStat({ label, price, sub, trend, percentage, icon, highlight, lang }: any) {
    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => {
                const text = `${label}: ₹${price}. ${sub}`;
                ttsService.speak(text, lang);
            }}
            className={cn(
                "p-8 rounded-[40px] border transition-all hover:scale-[1.02] relative group overflow-hidden cursor-pointer",
                highlight ? "bg-white border-[#00ab55]/20 shadow-xl shadow-[#00ab55]/5" : "bg-white border-gray-100 shadow-sm"
            )}>
            {highlight && (
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 group-hover:opacity-[0.05] transition-opacity">
                    <TrendingUp size={120} />
                </div>
            )}
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                    {icon}
                </div>
                {(trend === 'up' || (percentage && parseFloat(percentage) > 0)) && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-[#00ab55]/10 text-[#00ab55] rounded-full">
                        <TrendingUp size={12} />
                        <span className="text-[10px] font-black">{percentage ? (parseFloat(percentage) > 0 ? `+${percentage}%` : `${percentage}%`) : '+1.2%'}</span>
                    </div>
                )}
                {(trend === 'down' || (percentage && parseFloat(percentage) < 0)) && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-500 rounded-full">
                        <TrendingDown size={12} />
                        <span className="text-[10px] font-black">{percentage ? `${percentage}%` : '-0.8%'}</span>
                    </div>
                )}
                {trend === 'stable' && percentage === '0.00' && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-400 rounded-full">
                        <Minus size={12} />
                        <span className="text-[10px] font-black">0.0%</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <h4 className="text-4xl font-bold text-[#0a2635] tracking-tighter">₹{price}</h4>
                <p className="text-xs font-medium italic text-gray-500 mt-2">{sub}</p>
            </div>
        </motion.div>
    );
}
