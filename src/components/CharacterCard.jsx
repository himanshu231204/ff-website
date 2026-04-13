import { motion } from 'framer-motion';
import { UserX, AlertTriangle } from 'lucide-react';

export default function CharacterCard({ character, type, index }) {
  const isActive = type === 'active';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="group relative"
    >
      {/* Glow Border */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${isActive ? 'from-red-600 via-red-500 to-red-600' : 'from-orange-500 via-orange-400 to-orange-500'} rounded-xl opacity-30 group-hover:opacity-100 blur-md group-hover:blur transition duration-500`} />
      
      {/* Card Content */}
      <div className={`relative glass-card rounded-xl p-4 transition-all duration-300 ${isActive ? 'hover:bg-red-500/10' : 'hover:bg-orange-500/10'}`}>
        {/* Icon */}
        <div className="relative mb-3">
          <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${isActive ? 'from-red-600/30 to-red-800/30' : 'from-orange-500/30 to-orange-600/30'} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
            <UserX className={`${isActive ? 'text-red-400' : 'text-orange-400'} group-hover:text-white transition-colors duration-300`} size={24} />
          </div>
          
          {/* Pulsing Indicator */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${isActive ? 'bg-red-500' : 'bg-orange-500'} animate-pulse`} />
        </div>

        {/* Character Name */}
        <h3 className={`text-base font-bold text-center mb-2 transition-colors duration-300 ${isActive ? 'group-hover:text-red-300' : 'group-hover:text-orange-300'}`}>
          {character}
        </h3>

        {/* Type Badge */}
        <div className="flex justify-center">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
            isActive 
              ? 'bg-red-500/20 border border-red-500/40 text-red-400' 
              : 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
          }`}>
            <AlertTriangle size={10} className={isActive ? 'animate-pulse' : ''} />
            {isActive ? 'Active' : 'Passive'}
          </span>
        </div>

        {/* Hover Glow */}
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isActive ? 'bg-red-500/10' : 'bg-orange-500/10'
        }`} />
      </div>
    </motion.div>
  );
}
