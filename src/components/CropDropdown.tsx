import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Search, X, CheckCircle2 } from 'lucide-react';
import { SORTED_CROPS } from '../data/all_crops';

interface CropDropdownProps {
  value: string;
  onChange: (crop: string) => void;
  selectedCrops: string[];
  topCrops?: string[];
  placeholder?: string;
}

export const CropDropdown: React.FC<CropDropdownProps> = ({
  value,
  onChange,
  selectedCrops,
  topCrops = [],
  placeholder = "Search and select crops..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sort crops: top crops first, then rest of the list
  const topCropsSet = new Set(topCrops);
  const sortedCrops = [
    ...SORTED_CROPS.filter(crop => topCropsSet.has(crop)),
    ...SORTED_CROPS.filter(crop => !topCropsSet.has(crop))
  ];

  const filteredCrops = sortedCrops.filter(crop =>
    crop.toLowerCase().includes(search.toLowerCase()) && !selectedCrops.includes(crop)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (crop: string) => {
    onChange(crop);
    setSearch('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-white via-white to-gray-50 text-gray-800 rounded-2xl py-4 px-4 font-medium transition-all duration-200 flex items-center justify-between border-2 border-gray-200 hover:border-primary/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <span className="flex items-center gap-3">
          <Sprout size={18} className="text-primary flex-shrink-0" />
          <span className="text-gray-600">{placeholder}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Search Bar */}
            <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search crops..."
                  className="w-full pl-10 pr-4 py-3 text-sm text-gray-800 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-100 transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Crops List */}
            <div className="max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-track]:bg-transparent">
              {filteredCrops.length > 0 ? (
                <div className="py-2">
                  {/* Top Crops Section */}
                  {topCrops.length > 0 && search === '' && (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-primary/70">📍 Popular in your region</p>
                      </div>
                      {topCrops.map((crop) => (
                        !selectedCrops.includes(crop) && (
                          <motion.button
                            key={crop}
                            type="button"
                            whileHover={{ backgroundColor: '#f0fdf4' }}
                            onClick={() => handleSelect(crop)}
                            className="w-full px-4 py-3 text-left text-sm text-gray-800 hover:bg-green-50 transition-colors flex items-center justify-between group"
                          >
                            <span className="flex items-center gap-3">
                              <Sprout size={16} className="text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                              <span className="font-medium">{crop}</span>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary/60 bg-primary/10 px-2.5 py-1 rounded-full">
                              Top
                            </span>
                          </motion.button>
                        )
                      ))}
                      <div className="my-2 border-t border-gray-100" />
                    </>
                  )}

                  {/* All Crops Section */}
                  {search && <div className="px-4 py-2">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">All crops</p>
                  </div>}

                  {filteredCrops.map((crop) => (
                    <motion.button
                      key={crop}
                      type="button"
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      onClick={() => handleSelect(crop)}
                      className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3 group"
                    >
                      <Sprout size={16} className="text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                      <span className="group-hover:text-gray-900 transition-colors">{crop}</span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <Sprout size={32} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm text-gray-500">No crops found</p>
                  <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CropDropdown;
