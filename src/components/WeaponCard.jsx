import { motion } from 'framer-motion';
import { Crosshair, Target } from 'lucide-react';

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

const categoryColors = {
  'Sniper': 'from-red-500/30 to-red-600/30 border-red-500/40 text-red-400',
  'AR': 'from-green-500/30 to-green-600/30 border-green-500/40 text-green-400',
  'SMG': 'from-blue-500/30 to-blue-600/30 border-blue-500/40 text-blue-400',
  'Shotgun': 'from-orange-500/30 to-orange-600/30 border-orange-500/40 text-orange-400',
  'Pistol': 'from-yellow-500/30 to-yellow-600/30 border-yellow-500/40 text-yellow-400',
};

export default function WeaponCard({ weapon, index }) {
  const category = weaponCategories[weapon] || 'Weapon';
  const colors = categoryColors[category] || 'from-gray-500/30 to-gray-600/30 border-gray-500/40 text-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.06,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="group relative"
    >
      {/* Gradient Border Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00F2FF] via-[#7000FF] to-[#00F2FF] rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition duration-500" />
      
      {/* Card Content */}
      <div className="relative glass-card rounded-2xl p-5 hover:bg-white/[0.08] transition-all duration-300">
        {/* Icon Container */}
        <div className="relative mb-4">
          <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#00F2FF]/20 to-[#7000FF]/20 flex items-center justify-center group-hover:from-[#00F2FF]/30 group-hover:to-[#7000FF]/30 transition-all duration-300">
            <Crosshair className="text-[#00F2FF] group-hover:text-white transition-colors duration-300" size={26} />
          </div>
          
          {/* Category Badge */}
          <span className={`absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${colors} border`}>
            {category}
          </span>
        </div>

        {/* Weapon Name */}
        <h3 className="text-base font-bold text-white text-center mb-2 group-hover:text-[#00F2FF] transition-colors duration-300 truncate">
          {weapon}
        </h3>

        {/* Category Label */}
        <div className="flex justify-center">
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r ${colors} border`}>
            {category}
          </span>
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00F2FF]/5 to-[#7000FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Corner Accents */}
        <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#00F2FF]/0 group-hover:border-[#00F2FF]/50 transition-all duration-300" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#7000FF]/0 group-hover:border-[#7000FF]/50 transition-all duration-300" />
      </div>
    </motion.div>
  );
}
