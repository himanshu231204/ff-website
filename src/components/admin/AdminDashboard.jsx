import { Users, CalendarClock, Trophy, Skull, Zap, Target, ShieldBan } from 'lucide-react';

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

function QuickStat({ title, value, helper }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-gray-400">{title}</p>
      <p className="text-lg font-semibold text-white mt-1">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{helper}</p>
    </div>
  );
}

export default function AdminDashboard({ players, matches, leaderboard, weapons, bannedCharacters }) {
  const totalWins = players.reduce((sum, player) => sum + (player.stats?.wins || 0), 0);
  const totalLosses = players.reduce((sum, player) => sum + (player.stats?.losses || 0), 0);
  const totalScoreDifference = matches.reduce((sum, match) => sum + Number(match.scoreDifference || 0), 0);
  const totalMatches = matches.length;
  const topPlayer = leaderboard?.[0] || null;
  const scheduledMatches = matches.filter((m) => new Date(m.scheduledAt) > new Date()).length;
  const activeBanned = bannedCharacters.active.length;
  const passiveBanned = bannedCharacters.passive.length;

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
        <Stat icon={Skull} label="Total Losses" value={totalLosses} accent="bg-gradient-to-br from-red-500 to-rose-500" />
      </div>

      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
        <h3 className="text-lg font-semibold text-white">Top Player</h3>
        {topPlayer ? (
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xl font-bold text-white">{topPlayer.name}</p>
              <p className="text-sm text-gray-300">Group {topPlayer.group}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Points / NKR</p>
              <p className="text-2xl font-bold text-yellow-400">{topPlayer.points} / {topPlayer.nkr}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No player data available yet.</p>
        )}
      </div>

      <div className="glass-card rounded-2xl p-6 border border-white/15">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Stats Cards</h3>
        <div className="ui-grid ui-grid-4">
          <QuickStat title="Scheduled" value={scheduledMatches} helper="Matches waiting to be played" />
          <QuickStat title="Completed" value={Math.max(totalMatches - scheduledMatches, 0)} helper="Matches already recorded" />
          <QuickStat title="Weapons" value={weapons.length} helper="Allowed weapon entries" />
          <QuickStat title="Banned Chars" value={activeBanned + passiveBanned} helper={`Active ${activeBanned} / Passive ${passiveBanned}`} />
        </div>

        <div className="ui-grid ui-grid-3 mt-4">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 flex items-center gap-3">
            <Zap className="text-cyan-300" size={18} />
            <div>
              <p className="text-sm text-cyan-200">Avg Score Margin</p>
              <p className="text-xl font-bold text-white">{totalMatches ? (matches.reduce((s, m) => s + (m.scoreDifference || 0), 0) / totalMatches).toFixed(2) : '0.00'}</p>
            </div>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 flex items-center gap-3">
            <Target className="text-purple-300" size={18} />
            <div>
              <p className="text-sm text-purple-200">Win Efficiency</p>
              <p className="text-xl font-bold text-white">{totalMatches ? ((totalWins / totalMatches) * 100).toFixed(1) : '0.0'}%</p>
            </div>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex items-center gap-3">
            <ShieldBan className="text-red-300" size={18} />
            <div>
              <p className="text-sm text-red-200">Score Diff Balance</p>
              <p className="text-xl font-bold text-white">{totalScoreDifference}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
