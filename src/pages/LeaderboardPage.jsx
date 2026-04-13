import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Filter, Calculator, Crown, Medal } from 'lucide-react';
import { players, calculateLeaderboard } from '../data/players';

function PodiumCard({ player, position }) {
  const getPositionConfig = (position) => {
    if (position === 1) return {
      height: 'h-24 lg:h-32 xl:h-40',
      gradient: 'from-yellow-500 via-yellow-400 to-amber-300',
      glow: 'shadow-[0_0_40px_rgba(234,179,8,0.5)]',
      icon: <Crown className="text-yellow-600" size={24} />,
      rank: '#1'
    };
    if (position === 2) return {
      height: 'h-16 lg:h-24 xl:h-32',
      gradient: 'from-gray-400 via-gray-300 to-gray-200',
      glow: 'shadow-[0_0_30px_rgba(156,163,175,0.4)]',
      icon: <Medal className="text-gray-500" size={20} />,
      rank: '#2'
    };
    if (position === 3) return {
      height: 'h-12 lg:h-20 xl:h-24',
      gradient: 'from-amber-600 via-amber-500 to-amber-400',
      glow: 'shadow-[0_0_25px_rgba(217,119,6,0.4)]',
      icon: <Medal className="text-amber-700" size={18} />,
      rank: '#3'
    };
    return {};
  };

  const config = getPositionConfig(position);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.15, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="flex flex-col items-center"
    >
      {/* Player Info */}
      <motion.div
        className={`glass-card rounded-2xl p-3 sm:p-4 w-full ${config.glow} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        
        <div className="relative z-10 text-center">
          {/* Rank Icon */}
          <div className={`w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 mx-auto mb-2 sm:mb-3 rounded-xl lg:rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
            {config.icon}
          </div>
          
          {/* Player Name */}
          <h3 className="text-sm sm:text-lg font-bold text-white mb-1 truncate">{player.name}</h3>
          <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">Group {player.group}</p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 text-xs">
            <div className="bg-white/5 rounded-lg p-1.5 sm:p-2">
              <p className="text-gray-500 text-[10px] sm:text-xs">M</p>
              <p className="text-white font-semibold text-xs">{player.matches}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-1.5 sm:p-2">
              <p className="text-gray-500 text-[10px] sm:text-xs">W</p>
              <p className="text-green-400 font-semibold text-xs">{player.wins}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-1.5 sm:p-2">
              <p className="text-gray-500 text-[10px] sm:text-xs">K</p>
              <p className="text-red-400 font-semibold text-xs">{player.kills}</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Podium Stand */}
      <div className={`w-16 sm:w-20 lg:w-24 ${config.height} bg-gradient-to-b ${config.gradient} rounded-t-lg flex items-center justify-center shadow-lg ${config.glow}`}>
        <span className="text-xl lg:text-2xl font-black text-white/20">{config.rank}</span>
      </div>
    </motion.div>
  );
}

function LeaderboardRow({ player, rank }) {
  const getRankStyle = (rank) => {
    if (rank === 1) return 'from-yellow-500/20 to-amber-400/20 border-yellow-500/30';
    if (rank === 2) return 'from-gray-400/20 to-gray-300/20 border-gray-400/30';
    if (rank === 3) return 'from-amber-700/20 to-amber-600/20 border-amber-700/30';
    return 'from-[#00F2FF]/5 to-[#7000FF]/5 border-white/5';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: rank * 0.05 }}
      className={`grid grid-cols-12 gap-2 md:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r ${getRankStyle(rank)} border hover:bg-white/10 transition-all duration-300 group min-w-[600px]`}
    >
      {/* Rank */}
      <div className="col-span-1 flex items-center">
        <div className={`w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center ${rank <= 3 ? 'bg-yellow-500/20' : 'bg-white/10'}`}>
          {rank <= 3 ? (
            <Crown className={rank === 1 ? 'text-yellow-400' : 'text-gray-400'} size={14} />
          ) : (
            <span className="text-gray-400 font-bold text-xs sm:text-sm">{rank}</span>
          )}
        </div>
      </div>

      {/* Player */}
      <div className="col-span-4 md:col-span-4 flex items-center gap-2 sm:gap-3">
        <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br ${rank <= 3 ? 'from-yellow-500 to-amber-400' : 'from-[#00F2FF] to-[#7000FF]'} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-bold text-xs sm:text-sm">{player.name.charAt(0)}</span>
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold truncate text-sm">{player.name}</p>
          <p className="text-gray-500 text-xs">Group {player.group}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="col-span-2 md:col-span-1 flex items-center justify-center">
        <span className="text-white font-medium text-sm">{player.matches}</span>
      </div>
      <div className="col-span-2 md:col-span-1 flex items-center justify-center">
        <span className="text-green-400 font-medium text-sm">{player.wins}</span>
      </div>
      <div className="col-span-2 md:col-span-1 flex items-center justify-center">
        <span className="text-red-400 font-medium text-sm">{player.kills}</span>
      </div>
      
      {/* KR */}
      <div className="hidden md:flex col-span-1 items-center justify-center">
        <span className="text-blue-400 font-medium text-sm">{player.kr}</span>
      </div>
      
      {/* Score */}
      <div className="col-span-1 md:col-span-2 flex items-center justify-end">
        <span className={`font-bold text-sm ${rank <= 3 ? 'text-yellow-400' : 'text-[#00F2FF]'}`}>
          {player.finalScore}
        </span>
      </div>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const [filter, setFilter] = useState('all');

  const groupAPlayers = players.filter(p => p.group === 'A');
  const groupBPlayers = players.filter(p => p.group === 'B');

  // Dynamic calculation from data - no hardcoded values
  const sortedA = calculateLeaderboard(groupAPlayers);
  const sortedB = calculateLeaderboard(groupBPlayers);

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[150px] sm:h-[200px] bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-[60px] sm:blur-[80px] -z-10" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl mb-4 sm:mb-6 border border-yellow-500/20"
        >
          <Trophy className="text-yellow-400" size={28} sm:size={40} />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 px-2"
        >
          <span className="text-yellow-400">Leader</span>
          <span className="text-white">board</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-xl text-gray-400 max-w-xl mx-auto px-4"
        >
          Real-time tournament standings and player rankings
        </motion.p>
      </motion.div>

      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-xl p-3 sm:p-4"
      >
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Filter className="text-yellow-400" size={18} />
            <span className="text-gray-400 font-medium text-sm">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'A', 'B'].map((group) => (
              <button
                key={group}
                onClick={() => setFilter(group)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  filter === group
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {group === 'all' ? 'All Groups' : `Group ${group}`}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scoring Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-3 sm:p-4"
      >
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Calculator className="text-yellow-400" size={18} />
          <h3 className="font-semibold text-white text-sm sm:text-base">Scoring System</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">Win:</span>
            <span className="text-gray-300">+2 Points</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-bold">KR:</span>
            <span className="text-gray-300">Kills / Matches</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold">Final:</span>
            <span className="text-gray-300">Points + KR</span>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard Tables */}
      {(filter === 'all' || filter === 'A') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Group A</h2>
          </div>
          
          {/* Podium for Top 3 */}
          {sortedA.length >= 3 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <PodiumCard player={sortedA[1]} rank={2} position={2} />
              <PodiumCard player={sortedA[0]} rank={1} position={1} />
              <PodiumCard player={sortedA[2]} rank={3} position={3} />
            </div>
          )}
          
          {/* Table - Scrollable on mobile */}
          <div className="glass-card rounded-2xl overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-white/5 border-b border-white/10">
                <div className="col-span-1 text-gray-400 font-semibold text-sm">Rank</div>
                <div className="col-span-4 text-gray-400 font-semibold text-sm">Player</div>
                <div className="col-span-2 md:col-span-1 text-center text-gray-400 font-semibold text-sm">Matches</div>
                <div className="col-span-2 md:col-span-1 text-center text-gray-400 font-semibold text-sm">Wins</div>
                <div className="col-span-2 md:col-span-1 text-center text-gray-400 font-semibold text-sm">Kills</div>
                <div className="hidden md:flex col-span-1 text-center text-gray-400 font-semibold text-sm">KR</div>
                <div className="col-span-1 md:col-span-2 text-right text-yellow-400 font-semibold text-sm">Score</div>
              </div>
              <div className="divide-y divide-white/5">
                {sortedA.map((player, idx) => (
                  <LeaderboardRow key={player.id} player={player} rank={idx + 1} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {(filter === 'all' || filter === 'B') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Group B</h2>
          </div>
          
          {/* Podium for Top 3 */}
          {sortedB.length >= 3 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <PodiumCard player={sortedB[1]} rank={2} position={2} />
              <PodiumCard player={sortedB[0]} rank={1} position={1} />
              <PodiumCard player={sortedB[2]} rank={3} position={3} />
            </div>
          )}
          
          {/* Table - Scrollable on mobile */}
          <div className="glass-card rounded-2xl overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-white/5 border-b border-white/10">
                <div className="col-span-1 text-gray-400 font-semibold text-sm">Rank</div>
                <div className="col-span-4 text-gray-400 font-semibold text-sm">Player</div>
                <div className="col-span-2 md:col-span-1 text-center text-gray-400 font-semibold text-sm">Matches</div>
                <div className="col-span-2 md:col-span-1 text-center text-gray-400 font-semibold text-sm">Wins</div>
                <div className="col-span-2 md:col-span-1 text-center text-gray-400 font-semibold text-sm">Kills</div>
                <div className="hidden md:flex col-span-1 text-center text-gray-400 font-semibold text-sm">KR</div>
                <div className="col-span-1 md:col-span-2 text-right text-yellow-400 font-semibold text-sm">Score</div>
              </div>
              <div className="divide-y divide-white/5">
                {sortedB.map((player, idx) => (
                  <LeaderboardRow key={player.id} player={player} rank={idx + 1} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
