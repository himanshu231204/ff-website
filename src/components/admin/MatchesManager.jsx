import { useMemo, useState } from 'react';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';

const INITIAL_FORM = {
  player1Name: '',
  player2Name: '',
  score1: 0,
  score2: 0,
  stage: 'group',
  scheduledAt: '',
};

function toInputDateTime(isoDate) {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';
  const local = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return local.toISOString().slice(0, 16);
}

function getWinner(player1, player2, score1, score2) {
  if (Number(score1) > Number(score2)) return player1;
  if (Number(score2) > Number(score1)) return player2;
  return '-';
}

export default function MatchesManager({ players, matches, onCreateMatch, onUpdateMatch, onDeleteMatch }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState(null);

  const sortedMatches = useMemo(
    () => [...matches].sort((a, b) => new Date(b.scheduledAt || b.createdAt) - new Date(a.scheduledAt || a.createdAt)),
    [matches],
  );

  const formWinner = getWinner(form.player1Name, form.player2Name, form.score1, form.score2);
  const formMargin = Math.abs(Number(form.score1 || 0) - Number(form.score2 || 0));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.player1Name || !form.player2Name) return;
    if (form.player1Name === form.player2Name) return;
    if (Number(form.score1) === Number(form.score2)) return;

    const payload = {
      player1Name: form.player1Name,
      player2Name: form.player2Name,
      score1: Number(form.score1) || 0,
      score2: Number(form.score2) || 0,
      stage: form.stage,
      scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : new Date().toISOString(),
    };

    if (editingId) {
      onUpdateMatch(editingId, payload);
    } else {
      onCreateMatch(payload);
    }

    setEditingId(null);
    setForm(INITIAL_FORM);
  };

  const startEdit = (match) => {
    setEditingId(match.id);
    setForm({
      player1Name: match.player1,
      player2Name: match.player2,
      score1: match.score1 ?? 0,
      score2: match.score2 ?? 0,
      stage: match.stage || 'group',
      scheduledAt: toInputDateTime(match.scheduledAt || match.createdAt),
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 border border-white/15">
        <h2 className="text-2xl font-bold text-white">Match Management</h2>
        <p className="text-gray-300 mt-1">Create, edit, and delete match results using score-based input.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
        <div className="ui-grid ui-grid-3">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Player 1</span>
            <select
              value={form.player1Name}
              onChange={(e) => setForm((prev) => ({ ...prev, player1Name: e.target.value }))}
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
              onChange={(e) => setForm((prev) => ({ ...prev, player2Name: e.target.value }))}
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

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Score (Player 1)</span>
            <input
              type="number"
              min="0"
              value={form.score1}
              onChange={(e) => setForm((prev) => ({ ...prev, score1: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Score (Player 2)</span>
            <input
              type="number"
              min="0"
              value={form.score2}
              onChange={(e) => setForm((prev) => ({ ...prev, score2: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Schedule (Date/Time)</span>
            <input
              type="datetime-local"
              value={form.scheduledAt}
              onChange={(e) => setForm((prev) => ({ ...prev, scheduledAt: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </label>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-300">
          Winner: <span className="text-green-400 font-medium">{formWinner}</span>
          {' '}| Margin: <span className="text-cyan-300 font-medium">{formMargin}</span>
          {Number(form.score1) === Number(form.score2) && (
            <span className="text-red-300 ml-2">Scores cannot be equal.</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="ui-button"
            disabled={form.player1Name === form.player2Name || Number(form.score1) === Number(form.score2)}
          >
            <PlusCircle size={16} />
            {editingId ? 'Update Match' : 'Save Match Result'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(INITIAL_FORM);
              }}
              className="ui-button ui-button-muted"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="glass-card rounded-2xl p-6 border border-white/15">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Matches ({matches.length})</h3>
        <div className="space-y-3">
          {sortedMatches.slice(0, 12).map((match) => (
            <div key={match.id} className="rounded-xl border border-white/20 bg-white/5 p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-white/10 transition-all">
              <div className="flex-1 min-w-[220px]">
                <p className="text-white font-medium">
                  {match.player1} <span className="text-gray-400 text-sm">vs</span> {match.player2}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  Winner: <span className="text-green-400 font-medium">{match.winner}</span>
                  {' '}| Score: <span className="text-cyan-300">{match.score1} - {match.score2}</span>
                  {' '}| Margin: <span className="text-purple-300 font-medium">{match.scoreDifference}</span>
                  {' '}| Stage: <span className="text-purple-300 capitalize font-medium">{match.stage}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">Scheduled: {new Date(match.scheduledAt || match.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(match)}
                  className="rounded-lg border border-cyan-500/30 bg-cyan-500/15 p-2 text-cyan-300 hover:bg-cyan-500/25 transition-all"
                  title="Edit match"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDeleteMatch(match.id)}
                  className="rounded-lg border border-red-500/40 bg-red-500/15 p-2 text-red-300 hover:bg-red-500/25 transition-all"
                  title="Delete match"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {matches.length === 0 && <p className="text-gray-400 text-center py-6">No matches recorded yet.</p>}
        </div>
      </div>
    </div>
  );
}
