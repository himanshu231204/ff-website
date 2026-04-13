import { useMemo } from 'react';

export default function MatchHistoryManager({ matches }) {
  const sortedMatches = useMemo(
    () => [...matches].sort((a, b) => new Date(b.scheduledAt || b.createdAt) - new Date(a.scheduledAt || a.createdAt)),
    [matches],
  );

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 border border-white/15">
        <h2 className="text-2xl font-bold text-white">Match History</h2>
        <p className="text-gray-300 mt-1">All played/scheduled matches with winner, scores, margin, and date.</p>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-white/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-300 border-b border-white/10">
                <th className="py-3 pr-4">Match</th>
                <th className="py-3 pr-4">Winner</th>
                <th className="py-3 pr-4">Score</th>
                <th className="py-3 pr-4">Margin</th>
                <th className="py-3 pr-4">Stage</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedMatches.map((match) => (
                <tr key={match.id} className="border-b border-white/5 text-gray-100 hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4 font-medium">{match.player1} vs {match.player2}</td>
                  <td className="py-3 pr-4 text-green-300">{match.winner}</td>
                  <td className="py-3 pr-4 text-cyan-300">{match.score1 ?? 0} - {match.score2 ?? 0}</td>
                  <td className="py-3 pr-4 text-purple-300">{match.scoreDifference ?? Math.abs((match.score1 ?? 0) - (match.score2 ?? 0))}</td>
                  <td className="py-3 pr-4 capitalize text-purple-300">{match.stage}</td>
                  <td className="py-3 text-gray-300">{new Date(match.scheduledAt || match.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedMatches.length === 0 && (
          <p className="text-gray-400 text-center py-6">No match history available yet.</p>
        )}
      </div>
    </div>
  );
}
