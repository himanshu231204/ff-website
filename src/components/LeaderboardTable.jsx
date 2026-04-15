import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Medal, Crown } from 'lucide-react';

export default function LeaderboardTable({ players }) {
  const [sortConfig, setSortConfig] = useState({ key: 'points', direction: 'desc' });

  const sortedData = useMemo(() => {
    const data = [...players];
    data.sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        if (a[sortConfig.key] < b[sortConfig.key]) return -1;
        if (a[sortConfig.key] > b[sortConfig.key]) return 1;
        return 0;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) return 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return -1;
      return 0;
    });
    return data;
  }, [players, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
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
    <div className="ui-card overflow-hidden p-0">
      <div className="hidden md:grid md:grid-cols-8 gap-4 px-5 py-4 bg-white/5 border-b border-white/10">
        <div className="text-left text-gray-400 font-semibold text-sm">Rank</div>
        <button onClick={() => handleSort('name')} className="text-left col-span-2 text-gray-400 font-semibold text-sm hover:text-white transition-colors">
          Player<SortIcon column="name" />
        </button>
        <button onClick={() => handleSort('matchesPlayed')} className="text-right text-gray-400 font-semibold text-sm hover:text-white transition-colors">
          Matches<SortIcon column="matchesPlayed" />
        </button>
        <button onClick={() => handleSort('wins')} className="text-right text-gray-400 font-semibold text-sm hover:text-white transition-colors">
          Wins<SortIcon column="wins" />
        </button>
        <button onClick={() => handleSort('losses')} className="text-right text-gray-400 font-semibold text-sm hover:text-white transition-colors">
          Losses<SortIcon column="losses" />
        </button>
        <button onClick={() => handleSort('points')} className="text-right text-cyan-400 font-semibold text-sm hover:text-white transition-colors">
          Points<SortIcon column="points" />
        </button>
        <button onClick={() => handleSort('nkr')} className="text-right text-blue-400 font-semibold text-sm hover:text-white transition-colors">
          NKR<SortIcon column="nkr" />
        </button>
      </div>

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
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-3 px-5 py-4 hover:bg-white/10 transition-all duration-300 ${
                  rank <= 3 ? 'bg-gradient-to-r from-white/5 to-transparent' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankStyle(rank)} flex items-center justify-center`}>
                    {getRankIcon(rank)}
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankStyle(rank)} flex items-center justify-center`}>
                    <span className="text-white font-bold">{player.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{player.name}</p>
                    <p className="text-gray-500 text-xs">Group {player.group}</p>
                  </div>
                </div>

                <div className="text-right md:text-center"><span className="md:hidden text-gray-400 text-sm">Matches: </span><span className="text-white font-medium">{player.matchesPlayed}</span></div>
                <div className="text-right md:text-center"><span className="md:hidden text-gray-400 text-sm">Wins: </span><span className="text-green-400 font-medium">{player.wins}</span></div>
                <div className="text-right md:text-center"><span className="md:hidden text-gray-400 text-sm">Losses: </span><span className="text-red-400 font-medium">{player.losses}</span></div>
                <div className="text-right md:text-center"><span className="md:hidden text-gray-400 text-sm">Points: </span><span className="text-cyan-300 font-semibold">{player.points}</span></div>
                <div className="text-right md:text-center"><span className="md:hidden text-gray-400 text-sm">NKR: </span><span className="text-blue-400 font-semibold">{player.nkr}</span></div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
