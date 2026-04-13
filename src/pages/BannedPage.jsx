import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserX, ChevronDown, ChevronUp, AlertTriangle, ShieldAlert } from 'lucide-react';
import CharacterCard from '../components/CharacterCard';

const bannedCharacters = {
  active: [
    'Ray',
    'Nero',
    'Morse',
    'Oscar',
    'Kassie',
    'Ryden',
    'Ignis',
    'Iris',
    'Dimitri',
    'Skyler',
    'A124',
  ],
  passive: [
    'Sonia',
  ],
};

export default function BannedPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [showActive, setShowActive] = useState(true);
  const [showPassive, setShowPassive] = useState(true);

  const totalBanned = bannedCharacters.active.length + bannedCharacters.passive.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 lg:space-y-10"
    >
      {/* Page Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center py-8 sm:py-10 lg:py-12 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[150px] sm:h-[200px] bg-gradient-to-r from-red-500/10 to-orange-500/10 blur-[60px] sm:blur-[80px] -z-10" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl mb-4 sm:mb-6 border border-red-500/20"
        >
          <UserX className="text-red-400" size={28} sm:size={40} />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 px-2"
        >
          <span className="text-red-400">Banned</span>
          <span className="text-white"> Characters</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-xl text-gray-400 max-w-xl mx-auto px-4"
        >
          Characters restricted from tournament play
        </motion.p>
      </motion.div>

      {/* Banned Characters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div 
          className="p-4 sm:p-6 cursor-pointer flex items-center justify-between"
          onClick={() => setIsVisible(!isVisible)}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <ShieldAlert className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-white">Restricted Characters</h2>
              <p className="text-gray-500 text-xs sm:text-sm">{totalBanned} characters banned</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-red-400 font-semibold text-sm">{totalBanned} Banned</span>
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
                {/* Warning Banner */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3 mt-4 sm:mt-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                >
                  <AlertTriangle className="text-red-500 flex-shrink-0 animate-pulse mt-0.5" size={20} />
                  <p className="text-red-300 text-xs sm:text-sm">
                    Using banned characters will result in immediate disqualification.
                  </p>
                </motion.div>

                {/* Active Banned */}
                <div className="mt-4 sm:mt-6">
                  <button
                    onClick={() => setShowActive(!showActive)}
                    className="flex items-center gap-2 mb-3 sm:mb-4 w-full"
                  >
                    <h3 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-500 rounded-full animate-pulse" />
                      Active Banned
                    </h3>
                    <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/40 rounded text-xs font-semibold text-red-400">
                      {bannedCharacters.active.length}
                    </span>
                    {showActive ? (
                      <ChevronUp className="ml-auto text-gray-400" size={18} />
                    ) : (
                      <ChevronDown className="ml-auto text-gray-400" size={18} />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {showActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                          {bannedCharacters.active.map((character, index) => (
                            <CharacterCard 
                              key={character} 
                              character={character} 
                              type="active" 
                              index={index} 
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Passive Banned */}
                <div className="mt-4 sm:mt-6">
                  <button
                    onClick={() => setShowPassive(!showPassive)}
                    className="flex items-center gap-2 mb-3 sm:mb-4 w-full"
                  >
                    <h3 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-orange-500 rounded-full animate-pulse" />
                      Passive Banned
                    </h3>
                    <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/40 rounded text-xs font-semibold text-orange-400">
                      {bannedCharacters.passive.length}
                    </span>
                    {showPassive ? (
                      <ChevronUp className="ml-auto text-gray-400" size={18} />
                    ) : (
                      <ChevronDown className="ml-auto text-gray-400" size={18} />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {showPassive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                          {bannedCharacters.passive.map((character, index) => (
                            <CharacterCard 
                              key={character} 
                              character={character} 
                              type="passive" 
                              index={index} 
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
