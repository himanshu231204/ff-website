import { motion } from 'framer-motion';
import { Crosshair, Clock, Zap, CheckCircle, XCircle } from 'lucide-react';

export default function MatchCard({ match, index }) {
  const isGroupA = match.group === 'A';
  const isCompleted = match.winner !== null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="group relative h-full"
    >
      {/* Enhanced Gradient Border with Glow */}
      <div className={`absolute -inset-0.5 rounded-2xl opacity-40 group-hover:opacity-100 blur-md transition duration-500 ${
        isGroupA 
          ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500' 
          : 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500'
      }`} />
      
      {/* Card Content */}
      <div className="ui-card relative overflow-hidden p-5 sm:p-5 hover:bg-white/[0.06]">
        {/* Background Accent */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-30 ${
          isGroupA ? 'bg-blue-500' : 'bg-purple-500'
        }`} />

        {/* Top Row - Match Info */}
        <div className="flex items-center justify-between mb-4 relative z-10 gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isGroupA ? 'bg-blue-500' : 'bg-purple-500'} animate-pulse`} />
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
              isGroupA 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
            }`}>
              {match.group ? `Group ${match.group}` : match.stage}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {isCompleted ? (
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle size={12} />
                <span className="text-xs">Completed</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-gray-500">
                <Clock size={12} />
                <span className="text-xs">Round {match.round || 1}</span>
              </div>
            )}
          </div>
        </div>

        {/* VS Design - Center Stage */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 relative z-10">
          {/* Player 1 */}
          <div className="flex-1 text-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className={`w-14 sm:w-16 h-14 sm:h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 group-hover:border-white/30 ${
                match.winner === match.player1
                  ? 'bg-gradient-to-br from-green-600/50 to-green-700/50 border-green-500/60'
                  : isGroupA 
                    ? 'bg-gradient-to-br from-blue-600/30 to-blue-700/30 border-blue-500/40' 
                    : 'bg-gradient-to-br from-purple-600/30 to-purple-700/30 border-purple-500/40'
              }`}
            >
              <span className="text-xl sm:text-2xl font-black text-white">{match.player1?.charAt(0) || '?'}</span>
            </motion.div>
            <p className="text-white font-bold text-sm sm:text-base truncate px-1">{match.player1 || 'TBD'}</p>
            {isCompleted && match.winner === match.player1 && (
              <p className="text-green-400 text-xs mt-0.5 font-semibold">Winner</p>
            )}
          </div>

          {/* VS Badge - Star Feature */}
          <div className="relative flex-shrink-0">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-2xl ${
              isGroupA 
                ? 'bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-500' 
                : 'bg-gradient-to-br from-purple-500 via-pink-400 to-orange-500'
            }`}>
              {/* Animated Ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse" />
              <span className="text-white font-black text-sm sm:text-lg tracking-wider">VS</span>
            </div>
            {/* Glow Effect */}
            <div className={`absolute -inset-1 rounded-2xl blur-lg opacity-50 ${
              isGroupA ? 'bg-cyan-400' : 'bg-pink-500'
            }`} />
          </div>

          {/* Player 2 */}
          <div className="flex-1 text-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className={`w-14 sm:w-16 h-14 sm:h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 group-hover:border-white/30 ${
                match.winner === match.player2
                  ? 'bg-gradient-to-br from-green-600/50 to-green-700/50 border-green-500/60'
                  : isGroupA 
                    ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-purple-500/40' 
                    : 'bg-gradient-to-br from-orange-600/30 to-red-600/30 border-orange-500/40'
              }`}
            >
              <span className="text-xl sm:text-2xl font-black text-white">{match.player2?.charAt(0) || '?'}</span>
            </motion.div>
            <p className="text-white font-bold text-sm sm:text-base truncate px-1">{match.player2 || 'TBD'}</p>
            {isCompleted && match.winner === match.player2 && (
              <p className="text-green-400 text-xs mt-0.5 font-semibold">Winner</p>
            )}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl ${
          isGroupA 
            ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500' 
            : 'bg-gradient-to-r from-purple-500 via-pink-400 to-orange-500'
        }`} />
      </div>
    </motion.div>
  );
}
