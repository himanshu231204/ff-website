import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Filter, Calculator, Crown, Medal } from 'lucide-react';
import { useTournamentData } from '../hooks/useTournamentData';
import LeaderboardTable from '../components/LeaderboardTable';

function PodiumCard({ player, position }) {
  const config = {
    1: {
      gradient: 'from-yellow-500 via-yellow-400 to-amber-300',
      icon: <Crown className="text-yellow-600" size={24} />,
      glow: 'shadow-[0_0_28px_rgba(234,179,8,0.2)]',
    },
    2: {
      gradient: 'from-gray-400 via-gray-300 to-gray-200',
      icon: <Medal className="text-gray-500" size={20} />,
      glow: 'shadow-[0_0_22px_rgba(156,163,175,0.18)]',
    },
    3: {
      gradient: 'from-amber-600 via-amber-500 to-amber-400',
      icon: <Medal className="text-amber-700" size={18} />,
      glow: 'shadow-[0_0_22px_rgba(217,119,6,0.18)]',
    },
  }[position];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.12, duration: 0.4 }}
      className="ui-card text-center"
    >
      <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${config.gradient} shadow-lg ${config.glow}`}>
        {config.icon}
      </div>
      <h3 className="truncate text-base font-bold text-white">{player.name}</h3>
      <p className="mt-1 text-sm text-gray-400">Group {player.group}</p>
      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
        <div><p className="text-gray-500">M</p><p className="font-semibold text-white">{player.matchesPlayed}</p></div>
        <div><p className="text-gray-500">W</p><p className="font-semibold text-green-400">{player.wins}</p></div>
        <div><p className="text-gray-500">L</p><p className="font-semibold text-red-400">{player.losses}</p></div>
      </div>
      <div className={`mt-4 h-20 rounded-t-3xl bg-gradient-to-b ${config.gradient} ${config.glow} flex items-center justify-center`}>
        <span className="text-2xl font-black text-white/20">#{position}</span>
      </div>
    </motion.div>
  );
}

function SectionHeader({ label, accent }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${accent} animate-pulse`} />
      <h2 className="text-lg sm:text-xl font-bold text-white">{label}</h2>
    </div>
  );
}

function GroupBlock({ label, accent, playersList }) {
  return (
    <section className="space-y-4">
      <SectionHeader label={label} accent={accent} />
      {playersList.length >= 3 && (
        <div className="ui-grid ui-grid-3">
          <PodiumCard player={playersList[1]} position={2} />
          <PodiumCard player={playersList[0]} position={1} />
          <PodiumCard player={playersList[2]} position={3} />
        </div>
      )}
      <LeaderboardTable players={playersList} />
    </section>
  );
}

export default function LeaderboardPage() {
  const [filter, setFilter] = useState('all');
  const { players, leaderboard, getGroupLeaderboard } = useTournamentData();

  const groupAPlayers = getGroupLeaderboard('A');
  const groupBPlayers = getGroupLeaderboard('B');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ui-page space-y-10 mt-10">
      <section className="ui-card relative overflow-hidden text-center py-10">
        <div className="absolute inset-x-1/2 top-1/2 h-40 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="ui-header-badge mx-auto mb-6">
            <Trophy className="text-yellow-400" size={18} />
            <span className="text-sm font-medium text-yellow-400">Leaderboard</span>
          </div>
          <h1 className="ui-title mb-4">
            <span className="text-yellow-400">Leader</span><span className="text-white">board</span>
          </h1>
          <p className="ui-subtitle mx-auto">Real-time tournament standings and player rankings</p>
        </div>
      </section>

      <section className="ui-card">
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="text-yellow-400" size={18} />
          <span className="text-sm font-medium text-gray-400">Filter</span>
          <div className="flex flex-wrap gap-2">
            {['all', 'A', 'B'].map((group) => (
              <button
                key={group}
                onClick={() => setFilter(group)}
                className={`ui-button px-4 py-2 text-sm ${filter === group ? '' : 'ui-button-muted'}`}
              >
                {group === 'all' ? 'All Groups' : `Group ${group}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-card">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="text-yellow-400" size={18} />
          <h3 className="font-semibold text-white">Scoring System</h3>
        </div>
        <div className="ui-grid ui-grid-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"><span className="font-bold text-green-400">Win:</span> <span className="text-gray-300">+2 Points</span></div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"><span className="font-bold text-blue-400">NKR:</span> <span className="text-gray-300">Score Difference / Matches</span></div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"><span className="font-bold text-yellow-400">Rank:</span> <span className="text-gray-300">Points DESC, then NKR DESC</span></div>
        </div>
      </section>

      <GroupBlock label="Overall Leaderboard" accent="bg-yellow-500" playersList={leaderboard} />

      {(filter === 'all' || filter === 'A') && <GroupBlock label="Group A" accent="bg-blue-500" playersList={groupAPlayers} />}
      {(filter === 'all' || filter === 'B') && <GroupBlock label="Group B" accent="bg-purple-500" playersList={groupBPlayers} />}
    </motion.div>
  );
}