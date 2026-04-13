import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, ChevronDown, ChevronUp, Search } from 'lucide-react';
import WeaponCard from './WeaponCard';

const allowedWeapons = [
  'AWM-Y',
  'Kar98K',
  'Woodpecker',
  'AC80',
  'Groza (Normal)',
  'SVD',
  'XM8',
  'MP40',
  'Thompson (Normal)',
  'Bizon',
  'UMP',
  'MP5',
  'M1887',
  'Desert Eagle',
];

const weaponCategories = {
  'AWM-Y': 'Sniper',
  'Kar98K': 'Sniper',
  'Woodpecker': 'Sniper',
  'AC80': 'Sniper',
  'Groza (Normal)': 'AR',
  'SVD': 'Sniper',
  'XM8': 'AR',
  'MP40': 'SMG',
  'Thompson (Normal)': 'SMG',
  'Bizon': 'SMG',
  'UMP': 'SMG',
  'MP5': 'SMG',
  'M1887': 'Shotgun',
  'Desert Eagle': 'Pistol',
};

const categories = ['All', 'Sniper', 'AR', 'SMG', 'Shotgun', 'Pistol'];

export default function AllowedWeapons() {
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredWeapons = allowedWeapons.filter(weapon => {
    const matchesSearch = weapon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || weaponCategories[weapon] === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="ui-card overflow-hidden"
    >
      {/* Header */}
      <div 
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsVisible(!isVisible)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Crosshair className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Allowed Weapons</h2>
            <p className="text-gray-400 text-sm">{allowedWeapons.length} weapons available in tournament</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-purple-400 font-semibold">{filteredWeapons.length} / {allowedWeapons.length}</span>
          {isVisible ? (
            <ChevronUp className="text-gray-400" size={24} />
          ) : (
            <ChevronDown className="text-gray-400" size={24} />
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/10">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search weapons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weapons Grid */}
              <div className="ui-grid ui-grid-3">
                {filteredWeapons.map((weapon, index) => (
                  <WeaponCard key={weapon} weapon={weapon} index={index} />
                ))}
              </div>

              {filteredWeapons.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No weapons found matching your criteria</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
