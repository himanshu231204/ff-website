import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown } from 'lucide-react';

export default function LeaderboardTable({ players }) {
  const [sortConfig, setSortConfig] = useState({ key: 'finalScore', direction: 'desc' });

  // Calculate stats for each player
  const leaderboardData = useMemo(() => {
    return players.map(player => {
      const matches = player.matches || 1;
      const wins = player.wins || 0;
      const kills = player.kills || 0;
      const kr = matches > 0 ? (kills / matches).toFixed(2) : 0;
      const points = wins * 2;
      const finalScore = parseFloat(points) + parseFloat(kr);
      
      return {
        ...player,
        matches,
        wins,
        kills,
        kr: parseFloat(kr),
        points,
        finalScore: parseFloat(finalScore.toFixed(2))
      };
    });
  }, [players]);

  // Sort data
  const sortedData = useMemo(() => {
    const sorted = [...leaderboardData].sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });
    return sorted;
  }, [leaderboardData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const getRankStyle = (rank) => {
    if (rank === 1) return 'from-yellow-500 to-amber-400 border-yellow-500/50';
    if (rank === 2) return 'from-gray-400 to-gray-300 border-gray-400/50';
    if (rank === 3) return 'from-amber-700 to-amber-600 border-amber-700/50';
    return 'from-purple-600 to-blue-600 border-purple-500/30';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="text-yellow-400" size={20} />;
    if (rank === 2) return <Medal className="text-gray-300" size={20} />;
    if (rank === 3) return <Medal className="text-amber-600" size={20} />;
    return <span className="text-gray-400 font-bold">{rank}</span>;
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-8 gap-4 p-4 bg-white/5 border-b border-white/10">
        <button 
          onClick={() => handleSort('rank')}
          className="text-left text-gray-400 font-semibold text-sm hover:text-white transition-colors"
        >
          Rank<SortIcon column="rank" />
        </button>
        <button 
          onClick={() => handleSort('name')}
          className="text-left col-span-2 text-gray-400 font-semibold text-sm hover:text-white transition-colors"
        >
          Player<SortIcon column="name" />
        </button>
        <button 
          onClick={() => handleSort('matches')}
          className="text-right text-gray-400 font-semibold text-sm hover:text-white transition-colors"
        >
          Matches<SortIcon column="matches" />
        </button>
        <button 
          onClick={() => handleSort('wins')}
          className="text-right text-gray-400 font-semibold text-sm hover:text-white transition-colors"
        >
          Wins<SortIcon column="wins" />
        </button>
        <button 
          onClick={() => handleSort('kills')}
          className="text-right text-gray-400 font-semibold text-sm hover:text-white transition-colors"
        >
          Kills<SortIcon column="kills" />
        </button>
        <button 
          onClick={() => handleSort('kr')}
          className="text-right text-gray-400 font-semibold text-sm hover:text-white transition-colors"
        >
          KR<SortIcon column="kr" />
        </button>
        <button 
          onClick={() => handleSort('finalScore')}
          className="text-right text-orange-400 font-semibold text-sm hover:text-white transition-colors"
        >
          Final Score<SortIcon column="finalScore" />
        </button>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/5">
        <AnimatePresence>
          {sortedData.map((player, idx) => {
            const rank = idx + 1;
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`grid grid-cols-2 md:grid-cols-8 gap-2 md:gap-4 p-4 hover:bg-white/10 transition-all duration-300 group ${
                  rank <= 3 ? 'bg-gradient-to-r from-white/5 to-transparent' : ''
                }`}
              >
                {/* Rank */}
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankStyle(rank)} flex items-center justify-center`}>
                    {getRankIcon(rank)}
                  </div>
                </div>

                {/* Player Name */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankStyle(rank)} flex items-center justify-center`}>
                    <span className="text-white font-bold">{player.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{player.name}</p>
                    <p className="text-gray-500 text-xs">Group {player.group}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right md:text-center">
                  <span className="md:hidden text-gray-400 text-sm">Matches: </span>
                  <span className="text-white font-medium">{player.matches}</span>
                </div>
                <div className="text-right md:text-center">
                  <span className="md:hidden text-gray-400 text-sm">Wins: </span>
                  <span className="text-green-400 font-medium">{player.wins}</span>
                </div>
                <div className="text-right md:text-center">
                  <span className="md:hidden text-gray-400 text-sm">Kills: </span>
                  <span className="text-red-400 font-medium">{player.kills}</span>
                </div>
                <div className="text-right md:text-center">
                  <span className="md:hidden text-gray-400 text-sm">KR: </span>
                  <span className="text-blue-400 font-medium">{player.kr}</span>
                </div>
                <div className="text-right">
                  <span className="md:hidden text-gray-400 text-sm">Score: </span>
                  <span className={`font-bold ${rank <= 3 ? 'text-yellow-400' : 'text-orange-400'}`}>
                    {player.finalScore}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}