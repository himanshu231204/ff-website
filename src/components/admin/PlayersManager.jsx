import { useMemo, useState } from 'react';
import { Pencil, Trash2, UserPlus, Search } from 'lucide-react';

const INITIAL_FORM = {
  name: '',
  level: 1,
  group: 'A',
};

export default function PlayersManager({ players, onAddPlayer, onUpdatePlayer, onDeletePlayer }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');

  const visiblePlayers = useMemo(() => {
    return [...players]
      .filter((p) => (groupFilter === 'all' ? true : p.group === groupFilter))
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
  }, [players, search, groupFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const payload = {
      name: form.name.trim(),
      group: form.group,
      level: Number(form.level) || 1,
    };

    if (editingId) {
      onUpdatePlayer(editingId, payload);
    } else {
      onAddPlayer(payload);
    }

    setEditingId(null);
    setForm(INITIAL_FORM);
  };

  const startEdit = (player) => {
    setEditingId(player.id);
    setForm({
      name: player.name,
      level: player.level,
      group: player.group,
    });
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 border border-white/15">
        <h2 className="text-2xl font-bold text-white">Player Management</h2>
        <p className="text-gray-300 mt-1">Add, edit, delete, search, and filter players by group.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
        <div className="ui-grid ui-grid-3">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Name</span>
            <input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
              placeholder="Player name"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Level</span>
            <input
              type="number"
              min="1"
              value={form.level}
              onChange={(e) => setForm((prev) => ({ ...prev, level: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Group</span>
            <select
              value={form.group}
              onChange={(e) => setForm((prev) => ({ ...prev, group: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            >
              <option value="A">Group A</option>
              <option value="B">Group B</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="ui-button">
            <UserPlus size={16} />
            {editingId ? 'Update Player' : 'Add Player'}
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

      <div className="glass-card rounded-2xl p-6 border border-white/15 overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player"
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-cyan-500"
          >
            <option value="all">All Groups</option>
            <option value="A">Group A</option>
            <option value="B">Group B</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-300 border-b border-white/10">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Group</th>
                <th className="py-3 pr-4">Level</th>
                <th className="py-3 pr-4">Matches</th>
                <th className="py-3 pr-4">Wins</th>
                <th className="py-3 pr-4">Losses</th>
                <th className="py-3 pr-4">Score Diff</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visiblePlayers.map((player) => (
                <tr key={player.id} className="border-b border-white/5 text-gray-100 hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4 font-medium">{player.name}</td>
                  <td className="py-3 pr-4 text-cyan-300">{player.group}</td>
                  <td className="py-3 pr-4">{player.level}</td>
                  <td className="py-3 pr-4">{player.stats?.matchesPlayed || 0}</td>
                  <td className="py-3 pr-4 text-green-300">{player.stats?.wins || 0}</td>
                  <td className="py-3 pr-4 text-red-300">{player.stats?.losses || 0}</td>
                  <td className="py-3 pr-4 text-purple-300">{player.stats?.totalScoreDifference || 0}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(player)}
                        className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2 text-cyan-300 hover:bg-cyan-500/20 transition-all"
                        aria-label="Edit player"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeletePlayer(player.id)}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20 transition-all"
                        aria-label="Delete player"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visiblePlayers.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No players match current search/filter.</p>
        )}
      </div>
    </div>
  );
}
