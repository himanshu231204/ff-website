import { useMemo, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const INITIAL_FORM = {
  player1Name: '',
  player2Name: '',
  winnerId: '',
  kills1: 0,
  kills2: 0,
  stage: 'group',
};

export default function MatchesManager({ players, matches, onCreateMatch, onDeleteMatch }) {
  const [form, setForm] = useState(INITIAL_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.player1Name || !form.player2Name || !form.winnerId) {
      return;
    }

    if (form.player1Name === form.player2Name) {
      return;
    }

    onCreateMatch({
      player1Name: form.player1Name,
      player2Name: form.player2Name,
      winnerId: form.winnerId,
      kills1: Number(form.kills1) || 0,
      kills2: Number(form.kills2) || 0,
      stage: form.stage,
    });

    setForm(INITIAL_FORM);
  };

  const selectedPlayers = useMemo(() => {
    const p1 = players.find(p => p.name === form.player1Name);
    const p2 = players.find(p => p.name === form.player2Name);
    return { p1, p2 };
  }, [form.player1Name, form.player2Name, players]);

  const sortedMatches = useMemo(
    () => [...matches].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    [matches]
  );

  return (
    <div className="space-y-6">
      <div className="ui-card">
        <h2 className="text-2xl font-bold text-white">Manage Matches & Results</h2>
        <p className="text-gray-400 mt-1">Create matches and instantly update tournament statistics.</p>
      </div>

      <form onSubmit={handleSubmit} className="ui-card">
        <div className="ui-grid ui-grid-3">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Player 1</span>
            <select
              value={form.player1Name}
              onChange={(e) => setForm((prev) => ({ ...prev, player1Name: e.target.value, winnerId: '' }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
              required
            >
              <option value="">Select player</option>
              {players.map((player) => (
                <option key={player.id} value={player.name}>{player.name}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Player 2</span>
            <select
              value={form.player2Name}
              onChange={(e) => setForm((prev) => ({ ...prev, player2Name: e.target.value, winnerId: '' }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
              required
            >
              <option value="">Select player</option>
              {players.map((player) => (
                <option key={player.id} value={player.name}>{player.name}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Winner</span>
            <select
              value={form.winnerId}
              onChange={(e) => setForm((prev) => ({ ...prev, winnerId: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
              required
            >
              <option value="">Select winner</option>
              {selectedPlayers.p1 && <option value="player1">{selectedPlayers.p1.name}</option>}
              {selectedPlayers.p2 && <option value="player2">{selectedPlayers.p2.name}</option>}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Kills (Player 1)</span>
            <input
              type="number"
              min="0"
              value={form.kills1}
              onChange={(e) => setForm((prev) => ({ ...prev, kills1: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Kills (Player 2)</span>
            <input
              type="number"
              min="0"
              value={form.kills2}
              onChange={(e) => setForm((prev) => ({ ...prev, kills2: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Stage</span>
            <select
              value={form.stage}
              onChange={(e) => setForm((prev) => ({ ...prev, stage: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            >
              <option value="group">Group</option>
              <option value="semi">Semi Final</option>
              <option value="final">Final</option>
            </select>
          </label>
        </div>

        <button type="submit" className="ui-button mt-4" disabled={form.player1Name === form.player2Name}>
          <PlusCircle size={16} />
          Save Match Result
        </button>
      </form>

      <div className="ui-card">
        <h3 className="text-lg font-semibold text-white mb-3">Recent Matches ({matches.length})</h3>
        <div className="space-y-3">
          {sortedMatches.slice(0, 15).map((match) => (
            <div key={match.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-white font-medium">
                  {match.player1} vs {match.player2}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Winner: <span className="text-green-400 font-medium">{match.winner}</span> | 
                  {' '}Kills: {match.kills[match.player1]} - {match.kills[match.player2]} | 
                  {' '}Stage: <span className="capitalize">{match.stage}</span>
                </p>
              </div>
              <button
                onClick={() => onDeleteMatch(match.id)}
                className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20 ml-4"
                title="Delete match"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {matches.length === 0 && <p className="text-gray-400">No matches recorded yet.</p>}
        </div>
      </div>
    </div>
  );
}
