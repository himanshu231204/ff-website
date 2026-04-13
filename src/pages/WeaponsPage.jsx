import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, ChevronDown, ChevronUp, Search, Target } from 'lucide-react';
import WeaponCard from '../components/WeaponCard';

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

export default function WeaponsPage() {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="ui-page space-y-10 mt-10"
    >
      {/* Page Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="ui-card text-center py-10 relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[150px] sm:h-[200px] bg-gradient-to-r from-[#00F2FF]/10 to-[#7000FF]/10 blur-[60px] sm:blur-[80px] -z-10" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="ui-header-badge mx-auto mb-6"
        >
          <Crosshair className="h-7 w-7 sm:h-10 sm:w-10 text-[#00F2FF]" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="ui-title mb-4"
        >
          <span className="gradient-text">Allowed</span>
          <span className="text-white"> Weapons</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ui-subtitle mx-auto"
        >
          Weapons permitted for use in tournament matches
        </motion.p>
      </motion.div>

      {/* Weapons Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="ui-card overflow-hidden"
      >
        {/* Header */}
        <div 
          className="p-4 sm:p-6 cursor-pointer flex items-center justify-between"
          onClick={() => setIsVisible(!isVisible)}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-[#00F2FF] to-[#7000FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#00F2FF]/20">
              <Target className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-white">Tournament Weapons</h2>
              <p className="text-gray-500 text-xs sm:text-sm">{allowedWeapons.length} weapons available</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[#00F2FF] font-semibold text-sm">{filteredWeapons.length} / {allowedWeapons.length}</span>
            {isVisible ? (
              <ChevronUp className="text-gray-400" size={20} />
            ) : (
              <ChevronDown className="text-gray-400" size={20} />
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
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/10">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 mb-4 sm:mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="text"
                      placeholder="Search weapons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FF] transition-colors text-sm"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-[#00F2FF] to-[#7000FF] text-white shadow-lg shadow-[#00F2FF]/20'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weapons Grid - Responsive: 2 cols mobile, 3-4 tablet, more on desktop */}
                <div className="ui-grid ui-grid-3">
                  {filteredWeapons.map((weapon, index) => (
                    <WeaponCard key={weapon} weapon={weapon} index={index} />
                  ))}
                </div>

                {filteredWeapons.length === 0 && (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-400 text-sm sm:text-lg">No weapons found matching your criteria</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
