import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Filter } from 'lucide-react';
import { players } from '../data/players';
import PlayerCard from '../components/PlayerCard';
import content from '../data/content';

export default function PlayersPage() {
  const [filter, setFilter] = useState('all');

  const filteredPlayers = filter === 'all' 
    ? players 
    : players.filter(p => p.group === filter);

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
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[150px] sm:h-[200px] bg-gradient-to-r from-[#00F2FF]/10 to-[#7000FF]/10 blur-[60px] sm:blur-[80px] -z-10" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="ui-header-badge mx-auto mb-6"
        >
          <Users className="h-7 w-7 sm:h-10 sm:w-10 text-[#00F2FF]" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="ui-title mb-4"
        >
          <span className="gradient-text">{content.players.title}</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ui-subtitle mx-auto"
        >
          {content.players.description}
        </motion.p>
      </motion.div>

      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="ui-card p-4"
      >
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Filter className="text-[#00F2FF]" size={18} />
            <span className="text-gray-400 font-medium text-sm">{content.players.filter.label}:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: content.players.filter.all },
              { value: 'A', label: content.players.filter.groupA },
              { value: 'B', label: content.players.filter.groupB }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  filter === option.value
                    ? 'bg-gradient-to-r from-[#00F2FF] to-[#7000FF] text-white shadow-lg shadow-[#00F2FF]/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <span className="ml-auto text-gray-500 text-xs sm:text-sm hidden sm:block">
            {content.players.player.matches} <span className="text-[#00F2FF] font-semibold">{filteredPlayers.length}</span> of <span className="text-white font-semibold">{players.length}</span>
          </span>
        </div>
        {/* Mobile counter */}
        <div className="sm:hidden text-center mt-2 text-gray-500 text-xs">
          {content.players.player.matches} <span className="text-[#00F2FF] font-semibold">{filteredPlayers.length}</span> of <span className="text-white font-semibold">{players.length}</span>
        </div>
      </motion.div>

      {/* Players Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="ui-grid ui-grid-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredPlayers.map((player, index) => (
            <PlayerCard key={player.id} player={player} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPlayers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ui-card text-center py-12"
        >
          <p className="text-gray-400 text-lg">{content.players.emptyMessage}</p>
        </motion.div>
      )}
    </motion.div>
  );
}