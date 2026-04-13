import { useEffect, useState } from 'react';
import { Download, RotateCcw, Trash2 } from 'lucide-react';

export default function SettingsManager({
  settings,
  onUpdateSettings,
  onExportPlayers,
  onExportMatches,
  onResetLeaderboard,
  onClearMatches,
  onStartNewTournament,
}) {
  const [draft, setDraft] = useState(settings);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateSettings(draft);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 border border-white/15">
        <h2 className="text-2xl font-bold text-white">Tournament Settings</h2>
        <p className="text-gray-300 mt-1">Configure scoring and manage exports/reset actions.</p>
      </div>

      <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
        <div className="ui-grid ui-grid-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Points Per Win</span>
            <input
              type="number"
              min="1"
              value={draft.pointsPerWin}
              onChange={(e) => setDraft((prev) => ({ ...prev, pointsPerWin: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">NKR Precision</span>
            <input
              type="number"
              min="0"
              max="4"
              value={draft.nkrPrecision}
              onChange={(e) => setDraft((prev) => ({ ...prev, nkrPrecision: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Total Matches</span>
            <input
              type="number"
              min="1"
              value={draft.totalMatches}
              onChange={(e) => setDraft((prev) => ({ ...prev, totalMatches: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Group Size</span>
            <input
              type="number"
              min="1"
              value={draft.groupSize}
              onChange={(e) => setDraft((prev) => ({ ...prev, groupSize: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </label>
        </div>

        <button type="submit" className="ui-button">Save Settings</button>
      </form>

      <div className="glass-card rounded-2xl p-6 border border-white/15 space-y-4">
        <h3 className="text-lg font-semibold text-white">Export Data</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={onExportPlayers} className="ui-button" type="button">
            <Download size={16} />
            Export Players JSON
          </button>
          <button onClick={onExportMatches} className="ui-button" type="button">
            <Download size={16} />
            Export Matches JSON
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-red-500/25 space-y-4">
        <h3 className="text-lg font-semibold text-red-300">Reset System</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={onResetLeaderboard} className="ui-button ui-button-danger" type="button">
            <RotateCcw size={16} />
            Reset Leaderboard
          </button>
          <button onClick={onClearMatches} className="ui-button ui-button-danger" type="button">
            <Trash2 size={16} />
            Clear Matches
          </button>
          <button onClick={onStartNewTournament} className="ui-button ui-button-danger" type="button">
            <RotateCcw size={16} />
            Start New Tournament
          </button>
        </div>
      </div>
    </div>
  );
}
