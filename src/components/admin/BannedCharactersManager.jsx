import { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function BannedCharactersManager({ bannedCharacters, onAddCharacter, onRemoveCharacter }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('active');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCharacter(type, name);
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 border border-white/15">
        <h2 className="text-2xl font-bold text-white">Banned Characters Management</h2>
        <p className="text-gray-300 mt-1">Manage active and passive banned characters separately.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-white/15 flex flex-wrap gap-3 items-end">
        <label className="flex flex-col gap-2 min-w-[180px]">
          <span className="text-sm text-gray-300">Type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
          >
            <option value="active">Active</option>
            <option value="passive">Passive</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 flex-1 min-w-[220px]">
          <span className="text-sm text-gray-300">Character Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            placeholder="Enter character name"
            required
          />
        </label>

        <button type="submit" className="ui-button">
          <PlusCircle size={16} />
          Add Character
        </button>
      </form>

      <div className="ui-grid ui-grid-2">
        <div className="glass-card rounded-2xl p-6 border border-red-500/25 space-y-3">
          <h3 className="text-lg font-semibold text-red-300">Active ({bannedCharacters.active.length})</h3>
          {bannedCharacters.active.map((char) => (
            <div key={char.id} className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 flex items-center justify-between">
              <p className="text-white">{char.name}</p>
              <button
                onClick={() => onRemoveCharacter('active', char.id)}
                className="rounded-lg border border-red-500/40 bg-red-500/20 p-2 text-red-200 hover:bg-red-500/30 transition-all"
                title="Remove character"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {bannedCharacters.active.length === 0 && <p className="text-gray-400 text-sm">No active banned characters.</p>}
        </div>

        <div className="glass-card rounded-2xl p-6 border border-orange-500/25 space-y-3">
          <h3 className="text-lg font-semibold text-orange-300">Passive ({bannedCharacters.passive.length})</h3>
          {bannedCharacters.passive.map((char) => (
            <div key={char.id} className="rounded-xl border border-orange-500/25 bg-orange-500/10 px-4 py-3 flex items-center justify-between">
              <p className="text-white">{char.name}</p>
              <button
                onClick={() => onRemoveCharacter('passive', char.id)}
                className="rounded-lg border border-orange-500/40 bg-orange-500/20 p-2 text-orange-200 hover:bg-orange-500/30 transition-all"
                title="Remove character"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {bannedCharacters.passive.length === 0 && <p className="text-gray-400 text-sm">No passive banned characters.</p>}
        </div>
      </div>
    </div>
  );
}
