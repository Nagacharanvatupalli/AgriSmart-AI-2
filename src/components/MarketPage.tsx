import React, { useState, useEffect } from 'react';
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
    ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MarketData {
    commodity: string;
    market: string;
    state: string;
    district: string;
    min_price: number;
    max_price: number;
    modal_price: number;
    date: string;
    trend: 'up' | 'down' | 'stable';
    source: string;
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

export default function MarketPage() {
    const [searchMarket, setSearchMarket] = useState(() => localStorage.getItem('market_location') || 'Guntur');
    const [selectedCrop, setSelectedCrop] = useState(() => localStorage.getItem('market_selectedCrop') || '');
    const [cropSearch, setCropSearch] = useState('');
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredCommodities = ALL_COMMODITIES
        .filter(crop => crop.toLowerCase().includes(cropSearch.toLowerCase()))
        .sort((a, b) => {
            if (a === selectedCrop) return -1;
            if (b === selectedCrop) return 1;
            return 0;
        });

    const fetchMarketPrices = async (crop: string, market: string) => {
        if (!crop) return;
        setIsLoading(true);
        setError(null);
        setMarketData(null); // Clear previous data
        try {
            const response = await fetch(`/api/market/prices?crop=${encodeURIComponent(crop)}&market=${encodeURIComponent(market || 'India')}`);
            if (!response.ok) throw new Error('Failed to connect to market node');

            const data = await response.json();

            // Validate that we actually got valid price data
            // If modal_price is missing, 0, or not a valid number, we treat it as "No APMs available"
            const modalPrice = parseFloat(data.modal_price);
            if (!data || isNaN(modalPrice) || modalPrice === 0) {
                throw new Error('NO APMS are available at that location');
            }

            setMarketData(data);
        } catch (err: any) {
            setError(err.message || 'NO APMS are available at that location');
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Live Market Intelligence</span>
                        </div>
                        <h1 className="text-5xl font-bold text-[#0a2635] tracking-tight">Market Analysis</h1>
                        <p className="text-gray-500 font-medium italic">Real-time wholesale prices across Indian APMCs.</p>
                    </div>

                    <form onSubmit={handleSearch} className="flex gap-3 w-full lg:max-w-xl">
                        <div className="relative flex-1 group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00ab55] transition-colors">
                                <MapPin size={20} />
                            </div>
                            <input
                                type="text"
                                value={searchMarket}
                                onChange={(e) => setSearchMarket(e.target.value)}
                                placeholder="Search APMC / Market Name (e.g. Guntur, Warangal)"
                                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-[#00ab55]/5 focus:border-[#00ab55]/20 transition-all font-semibold text-gray-700 shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#0a2635] text-white px-8 py-4 rounded-[24px] font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                            <span className="hidden sm:inline">ANALYZE</span>
                        </button>
                    </form>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Filter Sidebar */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <Filter size={18} className="text-[#00ab55]" />
                                <h3 className="text-sm font-bold text-black uppercase tracking-widest">Select Commodity</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="relative group">
                                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00ab55] transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search commodity..."
                                        value={cropSearch}
                                        onChange={(e) => setCropSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#00ab55]/5 focus:border-[#00ab55]/20 transition-all font-semibold text-xs"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {filteredCommodities.map(crop => (
                                        <button
                                            key={crop}
                                            onClick={() => {
                                                setSelectedCrop(crop);
                                                fetchMarketPrices(crop, searchMarket);
                                            }}
                                            className={cn(
                                                "flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs font-bold transition-all text-left",
                                                selectedCrop === crop
                                                    ? "bg-[#00ab55]/5 text-[#00ab55] border border-[#00ab55]/20 ring-1 ring-[#00ab55]/10"
                                                    : "text-gray-500 hover:bg-gray-50 border border-transparent"
                                            )}
                                        >
                                            <span className="truncate">{crop}</span>
                                            {selectedCrop === crop && <ArrowRight size={14} className="flex-shrink-0" />}
                                        </button>
                                    ))}
                                    {filteredCommodities.length === 0 && (
                                        <div className="py-8 text-center">
                                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">No matching crops</p>
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
                                    <p className="mt-6 text-[#00ab55] font-black text-[10px] uppercase tracking-[0.3em]">Querying Market Node...</p>
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
                                    <h3 className="text-2xl font-bold text-[#0a2635] mb-3">No Price Data Available</h3>
                                    <p className="text-gray-400 font-medium max-w-md mb-2 leading-relaxed">
                                        Price predictions for <span className="font-bold text-[#0a2635]">{selectedCrop}</span> are currently not available at <span className="font-bold text-[#0a2635]">{searchMarket || 'this location'}</span>.
                                    </p>
                                    <p className="text-gray-400 text-sm italic max-w-sm mb-10">
                                        Try searching for a different commodity or another market location.
                                    </p>
                                    <button
                                        onClick={() => fetchMarketPrices(selectedCrop, searchMarket)}
                                        className="bg-[#0a2635] text-white px-10 py-4 rounded-[24px] font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center gap-3"
                                    >
                                        <Search size={16} />
                                        TRY AGAIN
                                    </button>
                                </motion.div>
                            ) : marketData ? (
                                <motion.div
                                    key="data"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    {/* Summary Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <PriceStat
                                            label="Modal Price"
                                            price={marketData.modal_price}
                                            sub={`Avg. price for ${marketData.commodity}`}
                                            trend={marketData.trend}
                                            icon={<BarChart3 className="text-blue-500" size={24} />}
                                            highlight
                                        />
                                        <PriceStat
                                            label="Min Price"
                                            price={marketData.min_price}
                                            sub="Lowest recorded today"
                                            trend="stable"
                                            icon={<ArrowDown className="text-red-400" size={24} />}
                                        />
                                        <PriceStat
                                            label="Max Price"
                                            price={marketData.max_price}
                                            sub="Highest recorded today"
                                            trend="up"
                                            icon={<ArrowUp className="text-[#00ab55]" size={24} />}
                                        />
                                    </div>

                                    {/* Market Details Card */}
                                    <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col md:flex-row gap-10 items-center">
                                        <div className="w-full md:w-1/3 space-y-6">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Market</p>
                                                <h3 className="text-3xl font-bold text-[#0a2635] tracking-tight">{marketData.market}</h3>
                                            </div>
                                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                                <MapPin className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Location</p>
                                                    <p className="text-sm font-bold text-gray-700">{marketData.district}, {marketData.state}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                                <Calendar className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Last Update</p>
                                                    <p className="text-sm font-bold text-gray-700">{new Date(marketData.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 w-full bg-[#f8fafb] rounded-[32px] p-8 border border-gray-100 relative overflow-hidden group">
                                            <div className="absolute top-4 right-8 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#00ab55] animate-pulse" />
                                                <span className="text-[10px] font-black text-[#00ab55] uppercase tracking-widest">LIVE DATA</span>
                                            </div>

                                            <h4 className="text-lg font-bold text-[#0a2635] mb-8">Quick Suggestions</h4>

                                            <div className="space-y-4">
                                                <SuggestionItem
                                                    text={marketData.trend === 'up'
                                                        ? `Prices for ${selectedCrop} are trending upwards. Good time for liquidation.`
                                                        : `Stability observed in ${selectedCrop} prices. Monitor for next 48 hours.`
                                                    }
                                                />
                                                <SuggestionItem
                                                    text={`The price gap between min/max is ${marketData.max_price - marketData.min_price} ₹. Grade quality is key.`}
                                                />
                                            </div>

                                            <button className="mt-8 w-full py-4 bg-white text-[#0a2635] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0a2635] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 group-hover:shadow-md">
                                                DOWNLOAD FULL MARKET REPORT <ArrowUpRight size={14} />
                                            </button>
                                        </div>
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
                                    <h3 className="text-2xl font-bold text-[#0a2635] mb-3">Begin Your Market Search</h3>
                                    <p className="text-gray-400 font-medium italic max-w-sm">
                                        Select a commodity from the sidebar to view live wholesale prices and historical trends across Indian markets.
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

function PriceStat({ label, price, sub, trend, icon, highlight }: any) {
    return (
        <div className={cn(
            "p-8 rounded-[40px] border transition-all hover:scale-[1.02] relative group overflow-hidden",
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
                {trend === 'up' && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-[#00ab55]/10 text-[#00ab55] rounded-full">
                        <TrendingUp size={12} />
                        <span className="text-[10px] font-black">+1.2%</span>
                    </div>
                )}
                {trend === 'down' && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-500 rounded-full">
                        <TrendingDown size={12} />
                        <span className="text-[10px] font-black">-0.8%</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <h4 className="text-4xl font-bold text-[#0a2635] tracking-tighter">₹{price}</h4>
                <p className="text-xs font-medium italic text-gray-500 mt-2">{sub}</p>
            </div>
        </div>
    );
}

function SuggestionItem({ text }: { text: string }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="mt-1 w-5 h-5 rounded-full bg-[#00ab55]/10 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ab55]" />
            </div>
            <p className="text-sm font-medium text-gray-600 leading-relaxed italic">{text}</p>
        </div>
    );
}
