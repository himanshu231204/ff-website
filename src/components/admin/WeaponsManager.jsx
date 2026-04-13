import { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function WeaponsManager({ weapons, onAddWeapon, onRemoveWeapon }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddWeapon(name);
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 border border-white/15">
        <h2 className="text-2xl font-bold text-white">Weapons Management</h2>
        <p className="text-gray-300 mt-1">Add or remove allowed weapons from tournament pool.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-white/15 flex flex-wrap gap-3 items-end">
        <label className="flex flex-col gap-2 flex-1 min-w-[220px]">
          <span className="text-sm text-gray-300">Weapon Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            placeholder="Enter weapon name"
            required
          />
        </label>
        <button type="submit" className="ui-button">
          <PlusCircle size={16} />
          Add Weapon
        </button>
      </form>

      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-3">
        <h3 className="text-lg font-semibold text-white">Allowed Weapons ({weapons.length})</h3>
        {weapons.map((weapon) => (
          <div key={weapon.id} className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 flex items-center justify-between">
            <p className="text-white">{weapon.name}</p>
            <button
              onClick={() => onRemoveWeapon(weapon.id)}
              className="rounded-lg border border-red-500/40 bg-red-500/15 p-2 text-red-300 hover:bg-red-500/25 transition-all"
              title="Remove weapon"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {weapons.length === 0 && <p className="text-gray-400 text-sm">No weapons configured.</p>}
      </div>
    </div>
  );
}
