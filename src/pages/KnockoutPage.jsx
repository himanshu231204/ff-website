import { motion } from 'framer-motion';
import { Swords, Trophy, Crown, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { knockoutMatches, generateSemiFinals, generateFinalMatch, isGroupStageComplete } from '../data/matches';
import { useTournamentData } from '../hooks/useTournamentData';

function getTopPlayers(leaderboardData) {
  return [...leaderboardData].slice(0, 4);
}

function MatchCard({ match, stage }) {
  const isCompleted = match.winner !== null;
  
  const getStageStyles = (stage) => {
    if (stage === 'Semi Finals') return 'border-purple-500/30 bg-purple-600/10';
    if (stage === 'Final') return 'border-yellow-500/30 bg-yellow-600/10';
    return 'border-green-500/30 bg-green-600/10';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`ui-card border-2 ${getStageStyles(stage)}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-400 uppercase">{stage}</span>
        {isCompleted ? (
          <div className="flex items-center gap-1 text-green-400 text-xs">
            <CheckCircle size={12} />
            Completed
          </div>
        ) : (
          <span className="text-xs px-2 py-1 rounded-full bg-yellow-600/30 text-yellow-400">
            {match.player1 && match.player2 ? 'Scheduled' : 'TBD'}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 text-center">
          <p className={`font-semibold ${match.winner === match.player1 ? 'text-green-400' : 'text-white'}`}>
            {match.player1 || 'TBD'}
          </p>
        </div>
        <ArrowRight className="text-gray-500" size={20} />
        <div className="flex-1 text-center">
          <p className={`font-semibold ${match.winner === match.player2 ? 'text-green-400' : 'text-white'}`}>
            {match.player2 || 'TBD'}
          </p>
        </div>
      </div>
      {isCompleted && (
        <div className="mt-3 text-center">
          <p className="text-sm text-green-400 font-semibold">Winner: {match.winner}</p>
        </div>
      )}
    </motion.div>
  );
}

function BracketLine() {
  return (
    <div className="hidden lg:block w-8 border-t-2 border-r-2 border-purple-500/30" />
  );
}

export default function KnockoutPage() {
  const { getGroupLeaderboard } = useTournamentData();
  const sortedA = getGroupLeaderboard('A');
  const sortedB = getGroupLeaderboard('B');
  const groupStageComplete = isGroupStageComplete();
  
  const topA = getTopPlayers(sortedA);
  const topB = getTopPlayers(sortedB);

  // Auto-generate knockout matches only after group stage is complete
  const semiFinalMatches = groupStageComplete && topA.length >= 2 && topB.length >= 2 
    ? generateSemiFinals(topA, topB) 
    : knockoutMatches.semiFinals;

  const semiWinners = semiFinalMatches
    .filter((match) => match.winner)
    .map((match) => match.winner);

  const finalMatch = semiWinners.length >= 2
    ? generateFinalMatch(semiWinners[0], semiWinners[1])
    : knockoutMatches.final;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="ui-page space-y-10 mt-10"
    >
      <div>
        <h1 className="ui-title text-3xl flex items-center gap-3">
          <Swords className="text-purple-500" />
          Knockout Stage
        </h1>
        <p className="ui-subtitle">Semi Finals → Grand Final</p>
        <p className="mt-2 text-sm text-gray-500">
          {groupStageComplete
            ? 'Bracket auto-generated from current tournament leaderboard.'
            : 'Complete group stage matches to auto-generate the knockout bracket.'}
        </p>
      </div>

      <div className="ui-grid ui-grid-2">
        <div className="ui-card">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold text-white">Top 4 - Group A</h2>
          </div>
          <div className="space-y-3">
            {topA.map((player, idx) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  idx < 2 ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-white/10'
                }`}>
                  {idx < 2 ? <Crown className="text-white" size={16} /> : <span className="text-white font-bold">{idx + 1}</span>}
                </div>
                <span className="font-semibold text-white">{player.name}</span>
                <span className="ml-auto text-gray-400 text-sm">Points: {player.points} | NKR: {player.nkr}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="ui-card">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold text-white">Top 4 - Group B</h2>
          </div>
          <div className="space-y-3">
            {topB.map((player, idx) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  idx < 2 ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-white/10'
                }`}>
                  {idx < 2 ? <Crown className="text-white" size={16} /> : <span className="text-white font-bold">{idx + 1}</span>}
                </div>
                <span className="font-semibold text-white">{player.name}</span>
                <span className="ml-auto text-gray-400 text-sm">Points: {player.points} | NKR: {player.nkr}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="ui-card">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="text-yellow-500" size={24} />
          <h2 className="text-xl font-bold text-white">Knockout Bracket</h2>
        </div>

        <div className="ui-grid ui-grid-3">
          <div className="space-y-4">
            <h3 className="text-center font-semibold text-purple-400">Semi Finals</h3>
            {semiFinalMatches.map((match) => (
              <MatchCard key={match.id} match={match} stage="Semi Finals" />
            ))}
          </div>
          
          <div className="flex items-center justify-center">
            <ArrowRight className="text-gray-600 rotate-90 lg:rotate-0" size={32} />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-center font-semibold text-yellow-400">Grand Final</h3>
            <MatchCard match={finalMatch} stage="Final" />
          </div>
        </div>
      </div>

      <div className="ui-card border-2 border-yellow-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Crown className="text-yellow-500" size={32} />
          <h2 className="text-2xl font-bold text-white">Tournament Champion</h2>
        </div>
        <p className="text-gray-400 text-center mb-4">
          Winner of Grand Final
        </p>
        {finalMatch.winner ? (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-yellow-500/30">
                <Crown className="text-white" size={40} />
              </div>
              <p className="text-yellow-400 font-bold text-xl">{finalMatch.winner}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-white">?</span>
              </div>
              <p className="text-purple-400 font-semibold">SF Winner 1</p>
            </div>
            <span className="text-3xl text-gray-500">VS</span>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-white">?</span>
              </div>
              <p className="text-blue-400 font-semibold">SF Winner 2</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
