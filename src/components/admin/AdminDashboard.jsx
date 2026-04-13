import { Users, CalendarClock, Trophy, Skull } from 'lucide-react';

function Stat({ icon: Icon, label, value, accent }) {
  return (
    <div className="glass-card rounded-2xl p-5 border border-white/15">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-300">{label}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}>
          <Icon className="text-white" size={18} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export default function AdminDashboard({ players, matches, leaderboard }) {
  const totalKills = players.reduce((sum, player) => sum + (player.kills || 0), 0);
  const totalWins = players.reduce((sum, player) => sum + (player.wins || 0), 0);
  const totalMatches = players.reduce((sum, player) => sum + (player.matches || 0), 0);
  const topPlayer = leaderboard?.[0] || null;

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 border border-white/15">
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
        <p className="text-gray-400 mt-1">Monitor and manage tournament data in real time.</p>
      </div>

      <div className="ui-grid ui-grid-4">
        <Stat icon={Users} label="Total Players" value={players.length} accent="bg-gradient-to-br from-cyan-500 to-blue-500" />
        <Stat icon={CalendarClock} label="Total Matches" value={matches.length} accent="bg-gradient-to-br from-purple-500 to-violet-500" />
        <Stat icon={Trophy} label="Total Wins" value={totalWins} accent="bg-gradient-to-br from-yellow-500 to-orange-500" />
        <Stat icon={Skull} label="Total Kills" value={totalKills} accent="bg-gradient-to-br from-red-500 to-rose-500" />
      </div>
    </div>
  );
}
