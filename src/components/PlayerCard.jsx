import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Zap } from 'lucide-react';

export default function PlayerCard({ player, index }) {
  return (
    <Link to={`/players/${player.id}`} className="group relative block h-full no-underline">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.08,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.03,
          y: -8,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        className="relative h-full"
      >
        {/* Gradient Border Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00F2FF] via-[#7000FF] to-[#00F2FF] rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition duration-500" />
        
        {/* Card Content */}
        <div className="ui-card relative overflow-hidden p-5 sm:p-6 hover:bg-white/[0.08]">
        {/* Avatar Container */}
        <div className="relative mb-4 sm:mb-5">
          {/* Avatar Glow Ring */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00F2FF] to-[#7000FF] rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500" />
          
          <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-[#00F2FF]/20 to-[#7000FF]/20 flex items-center justify-center border-2 border-white/10 group-hover:border-[#00F2FF]/50 transition-all duration-300">
            <User className="h-7 w-7 sm:h-9 sm:w-9 text-[#00F2FF] group-hover:text-white transition-colors duration-300" />
          </div>
          
          {/* Level Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.08 }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2"
          >
            <span className="flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-gradient-to-r from-[#00F2FF] to-[#7000FF] rounded-full text-xs font-bold text-white shadow-lg shadow-[#00F2FF]/30">
              <Zap size={10} className="animate-pulse" />
              <span className="hidden sm:inline">LVL</span> {player.level}
            </span>
          </motion.div>
        </div>

        {/* Player Name */}
        <h3 className="text-base sm:text-lg font-bold text-white text-center mb-3 sm:mb-4 group-hover:text-[#00F2FF] transition-colors duration-300 truncate">
          {player.name}
        </h3>

        {/* Group Tag */}
        <div className="flex justify-center">
          <span className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            player.group === 'A' 
              ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400 group-hover:bg-blue-500/30 group-hover:border-blue-500/60' 
              : 'bg-purple-500/20 border border-purple-500/40 text-purple-400 group-hover:bg-purple-500/30 group-hover:border-purple-500/60'
          }`}>
            Group {player.group}
          </span>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00F2FF]/5 to-[#7000FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Corner Accents */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-2 h-2 border-t-2 border-r-2 border-[#00F2FF]/0 group-hover:border-[#00F2FF]/50 transition-all duration-300" />
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-2 h-2 border-b-2 border-l-2 border-[#7000FF]/0 group-hover:border-[#7000FF]/50 transition-all duration-300" />
        </div>
      </motion.div>
    </Link>
  );
}
