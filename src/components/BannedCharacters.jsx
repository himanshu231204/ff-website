import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserX, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import CharacterCard from './CharacterCard';

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

export default function BannedCharacters() {
  const [isVisible, setIsVisible] = useState(true);
  const [showActive, setShowActive] = useState(true);
  const [showPassive, setShowPassive] = useState(true);

  const totalBanned = bannedCharacters.active.length + bannedCharacters.passive.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div 
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsVisible(!isVisible)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
            <UserX className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Banned Characters</h2>
            <p className="text-gray-400 text-sm">{totalBanned} characters restricted in tournament</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-red-400 font-semibold">{totalBanned} Banned</span>
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
              {/* Warning Banner */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
              >
                <AlertTriangle className="text-red-500 flex-shrink-0" size={24} />
                <p className="text-red-300 text-sm">
                  These characters are restricted from use in tournament matches. Using a banned character will result in disqualification.
                </p>
              </motion.div>

              {/* Active Banned */}
              <div className="mt-6">
                <button
                  onClick={() => setShowActive(!showActive)}
                  className="flex items-center gap-2 mb-4"
                >
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    Active Banned
                  </h3>
                  <span className="px-2 py-0.5 bg-red-600 rounded text-xs font-semibold text-white">
                    {bannedCharacters.active.length}
                  </span>
                  {showActive ? (
                    <ChevronUp className="text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
              <div className="mt-6">
                <button
                  onClick={() => setShowPassive(!showPassive)}
                  className="flex items-center gap-2 mb-4"
                >
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                    Passive Banned
                  </h3>
                  <span className="px-2 py-0.5 bg-orange-600 rounded text-xs font-semibold text-white">
                    {bannedCharacters.passive.length}
                  </span>
                  {showPassive ? (
                    <ChevronUp className="text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
  );
}
