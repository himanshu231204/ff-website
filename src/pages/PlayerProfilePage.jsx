import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Gamepad2, Medal, Target, Trophy, Users } from 'lucide-react';
import { useTournamentData } from '../hooks/useTournamentData';
import { isGroupStageComplete } from '../data/matches';

function StatCard({ label, value, helper, accent }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${accent}`}>
          <Gamepad2 className="text-white" size={18} />
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">{helper}</p>
    </div>
  );
}

function MatchRow({ match, playerName }) {
  const isWinner = match.winner === playerName;
  const isCompleted = Boolean(match.winner);
  const playerKills = Number(match.kills?.[playerName] || 0);
  const opponentName = match.player1 === playerName ? match.player2 : match.player1;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-white font-semibold">vs {opponentName}</p>
        <p className="text-xs text-gray-500 mt-1">{match.stage === 'group' ? `Group ${match.group}` : match.stage}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className={`rounded-full px-3 py-1 font-semibold ${isWinner ? 'bg-green-500/15 text-green-400 border border-green-500/30' : isCompleted ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30'}`}>
          {isCompleted ? (isWinner ? 'Won' : 'Lost') : 'Pending'}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300">
          Kills: <span className="text-cyan-300 font-semibold">{playerKills}</span>
        </span>
        {match.round ? (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300">
            Round: <span className="text-white font-semibold">{match.round}</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function PlayerProfilePage() {
  const { playerId } = useParams();
  const { players, matches, leaderboard, getGroupLeaderboard } = useTournamentData();

  const player = useMemo(() => players.find((item) => String(item.id) === String(playerId)), [players, playerId]);

  const playerProfile = useMemo(() => {
    if (!player) return null;

    const playerMatches = matches
      .filter((match) => match.player1 === player.name || match.player2 === player.name)
      .sort((a, b) => new Date(b.scheduledAt || b.createdAt) - new Date(a.scheduledAt || a.createdAt));

    const totalKills = playerMatches.reduce((sum, match) => sum + Number(match.kills?.[player.name] || 0), 0);
    const wins = player.stats?.wins || 0;
    const losses = player.stats?.losses || 0;
    const matchesPlayed = player.stats?.matchesPlayed || 0;
    const points = wins * 2;
    const rank = leaderboard.findIndex((item) => item.id === player.id) + 1;
    const nkr = Number(((player.stats?.totalScoreDifference || 0) / 10).toFixed(2));
    const groupStageComplete = isGroupStageComplete();
    const groupLeaderboard = getGroupLeaderboard(player.group);
    const groupRank = groupLeaderboard.findIndex((item) => item.id === player.id) + 1;
    const qualificationStatus = !groupStageComplete
      ? { label: 'Qualification Pending', className: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30' }
      : groupRank > 0 && groupRank <= 4
        ? { label: 'Qualified for Knockout', className: 'bg-green-500/15 text-green-400 border border-green-500/30' }
        : { label: 'Not Qualified', className: 'bg-red-500/15 text-red-400 border border-red-500/30' };

    return {
      playerMatches,
      totalKills,
      wins,
      losses,
      matchesPlayed,
      points,
      rank: rank > 0 ? rank : null,
      nkr,
      qualificationStatus,
      groupRank: groupRank > 0 ? groupRank : null,
    };
  }, [player, matches, leaderboard, getGroupLeaderboard]);

  if (!player) {
    return <Navigate to="/players" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="ui-page space-y-10 mt-10"
    >
      <Link
        to="/players"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:border-cyan-500/40 hover:text-white transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        Back to Players
      </Link>

      <section className="ui-card relative overflow-hidden">
        <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-gradient-to-br from-[#00F2FF]/15 to-[#7000FF]/20 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className={`h-24 w-24 rounded-3xl border-2 flex items-center justify-center text-3xl font-black shadow-lg ${player.group === 'A' ? 'border-blue-500/40 bg-blue-500/15 text-blue-300' : 'border-purple-500/40 bg-purple-500/15 text-purple-300'}`}>
              {player.name.charAt(0)}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
                <Users size={14} />
                Group {player.group}
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white">{player.name}</h1>
              <p className="mt-2 text-gray-400">Player profile automatically updates from tournament data input.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-400">Level</p>
              <p className="mt-1 text-2xl font-bold text-white">{player.level}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-400">Rank</p>
              <p className="mt-1 text-2xl font-bold text-white">{playerProfile.rank ? `#${playerProfile.rank}` : '-'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-grid ui-grid-4">
        <StatCard label="Matches" value={playerProfile.matchesPlayed} helper="Total matches recorded" accent="bg-gradient-to-br from-cyan-500 to-blue-500" />
        <StatCard label="Wins" value={playerProfile.wins} helper="Matches won by manual winner input" accent="bg-gradient-to-br from-green-500 to-emerald-500" />
        <StatCard label="Losses" value={playerProfile.losses} helper="Matches lost against declared winner" accent="bg-gradient-to-br from-red-500 to-rose-500" />
        <StatCard label="Kills" value={playerProfile.totalKills} helper="Total kills filled in tournamentInput.js" accent="bg-gradient-to-br from-yellow-500 to-orange-500" />
      </section>

      <section className="ui-grid ui-grid-3">
        <div className="ui-card">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-400" size={18} />
            <h2 className="font-semibold text-white">Points</h2>
          </div>
          <p className="mt-3 text-3xl font-black text-cyan-300">{playerProfile.points}</p>
          <p className="mt-2 text-sm text-gray-500">Calculated from wins × 2</p>
        </div>
        <div className="ui-card">
          <div className="flex items-center gap-2">
            <Target className="text-blue-400" size={18} />
            <h2 className="font-semibold text-white">NKR</h2>
          </div>
          <p className="mt-3 text-3xl font-black text-blue-300">{playerProfile.nkr}</p>
          <p className="mt-2 text-sm text-gray-500">Auto-updates from score difference data</p>
        </div>
        <div className="ui-card">
          <div className="flex items-center gap-2">
            <Medal className="text-purple-400" size={18} />
            <h2 className="font-semibold text-white">Status</h2>
          </div>
          <p className="mt-3 text-lg font-semibold text-white">{playerProfile.wins > playerProfile.losses ? 'Winning Form' : 'Needs Improvement'}</p>
          <p className="mt-2 text-sm text-gray-500">Based on current tournament performance</p>
        </div>
        <div className="ui-card">
          <div className="flex items-center gap-2">
            <Crown className="text-yellow-400" size={18} />
            <h2 className="font-semibold text-white">Qualification</h2>
          </div>
          <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${playerProfile.qualificationStatus.className}`}>
            {playerProfile.qualificationStatus.label}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Group rank: {playerProfile.groupRank ? `#${playerProfile.groupRank}` : '-'}
          </p>
        </div>
      </section>

      <section className="ui-card space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">Recent Matches</h2>
            <p className="text-sm text-gray-500">Latest matches from tournamentInput.js</p>
          </div>
          <div className="text-sm text-gray-400">
            {playerProfile.playerMatches.length} matches found
          </div>
        </div>

        <div className="space-y-3">
          {playerProfile.playerMatches.length > 0 ? (
            playerProfile.playerMatches.slice(0, 6).map((match) => (
              <MatchRow key={match.id} match={match} playerName={player.name} />
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-400">
              No matches found for this player yet.
            </div>
          )}
        </div>
      </section>

      <section className="ui-card">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="text-yellow-400" size={18} />
          <h2 className="font-semibold text-white">Update Source</h2>
        </div>
        <p className="text-gray-400 text-sm leading-6">
          This profile auto-refreshes from the tournament data pipeline, so when you edit
          <span className="text-white font-semibold"> src/data/tournamentInput.js</span>, the player profile, leaderboard,
          and match summary update together.
        </p>
      </section>
    </motion.div>
  );
}
