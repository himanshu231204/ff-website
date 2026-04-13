import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  LayoutDashboard,
  ShieldUser,
  Swords,
  History,
  Crosshair,
  UserX,
  Settings,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTournamentData } from '../hooks/useTournamentData';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import PlayersManager from '../components/admin/PlayersManager';
import MatchesManager from '../components/admin/MatchesManager';
import MatchHistoryManager from '../components/admin/MatchHistoryManager';
import WeaponsManager from '../components/admin/WeaponsManager';
import BannedCharactersManager from '../components/admin/BannedCharactersManager';
import SettingsManager from '../components/admin/SettingsManager';

function Toast({ toast }) {
  if (!toast) return null;
  const colors = {
    success: 'border-green-500/40 bg-green-500/10 text-green-200',
    error: 'border-red-500/40 bg-red-500/10 text-red-200',
    info: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200',
  };

  return (
    <div className={`fixed bottom-6 right-6 rounded-xl border px-4 py-3 text-sm z-[100] ${colors[toast.type] || colors.info}`}>
      {toast.message}
    </div>
  );
}

export default function AdminPage() {
  const { logout } = useAuth();
  const {
    isLoaded,
    players,
    matches,
    weapons,
    bannedCharacters,
    settings,
    addPlayer,
    updatePlayer,
    deletePlayer,
    addMatch,
    updateMatch,
    deleteMatch,
    addWeapon,
    removeWeapon,
    addBannedCharacter,
    removeBannedCharacter,
    updateSettings,
    resetLeaderboard,
    clearMatches,
    startNewTournament,
    exportPlayers,
    exportMatches,
    getLeaderboard,
  } = useTournamentData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);

  const tabs = useMemo(
    () => [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { key: 'players', label: 'Players', icon: ShieldUser },
      { key: 'matches', label: 'Matches', icon: Swords },
      { key: 'history', label: 'Match History', icon: History },
      { key: 'weapons', label: 'Weapons', icon: Crosshair },
      { key: 'banned', label: 'Banned Characters', icon: UserX },
      { key: 'settings', label: 'Settings', icon: Settings },
    ],
    [],
  );

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 2600);
  };

  const handleAddPlayer = (payload) => {
    try {
      addPlayer(payload);
      showToast('success', 'Player added successfully.');
    } catch (err) {
      showToast('error', 'Failed to add player.');
    }
  };

  const handleUpdatePlayer = (id, payload) => {
    try {
      updatePlayer(id, payload);
      showToast('success', 'Player updated successfully.');
    } catch (err) {
      showToast('error', 'Failed to update player.');
    }
  };

  const handleDeletePlayer = (id) => {
    const confirmed = window.confirm('Delete this player? This cannot be undone.');
    if (!confirmed) return;

    try {
      deletePlayer(id);
      showToast('success', 'Player deleted successfully.');
    } catch (err) {
      showToast('error', 'Failed to delete player.');
    }
  };

  const handleCreateMatch = (matchData) => {
    try {
      addMatch(matchData);
      showToast('success', 'Match created and stats updated.');
    } catch (err) {
      showToast('error', 'Failed to create match.');
    }
  };

  const handleUpdateMatch = (id, payload) => {
    try {
      updateMatch(id, payload);
      showToast('success', 'Match updated and stats recalculated.');
    } catch (err) {
      showToast('error', 'Failed to update match.');
    }
  };

  const handleDeleteMatch = (matchId) => {
    const confirmed = window.confirm('Delete this match? Stats will be reverted.');
    if (!confirmed) return;

    try {
      deleteMatch(matchId);
      showToast('success', 'Match deleted and stats reverted.');
    } catch (err) {
      showToast('error', 'Failed to delete match.');
    }
  };

  const handleAddWeapon = (name) => {
    addWeapon(name);
    showToast('success', 'Weapon added.');
  };

  const handleRemoveWeapon = (id) => {
    removeWeapon(id);
    showToast('success', 'Weapon removed.');
  };

  const handleAddBannedCharacter = (type, name) => {
    addBannedCharacter(type, name);
    showToast('success', 'Banned character added.');
  };

  const handleRemoveBannedCharacter = (type, id) => {
    removeBannedCharacter(type, id);
    showToast('success', 'Banned character removed.');
  };

  const handleUpdateSettings = (draft) => {
    updateSettings(draft);
    showToast('success', 'Settings updated.');
  };

  const handleResetLeaderboard = () => {
    const confirmed = window.confirm('Reset leaderboard and clear all recorded match stats?');
    if (!confirmed) return;
    resetLeaderboard();
    showToast('success', 'Leaderboard reset completed.');
  };

  const handleClearMatches = () => {
    const confirmed = window.confirm('Clear all matches? This cannot be undone.');
    if (!confirmed) return;
    clearMatches();
    showToast('success', 'All matches cleared.');
  };

  const handleStartNewTournament = () => {
    const confirmed = window.confirm('Start a brand new tournament with default setup?');
    if (!confirmed) return;
    startNewTournament();
    showToast('success', 'New tournament initialized.');
  };

  const leaderboard = getLeaderboard();

  const tabContent = useMemo(() => {
    if (activeTab === 'players') {
      return (
        <PlayersManager
          players={players}
          onAddPlayer={handleAddPlayer}
          onUpdatePlayer={handleUpdatePlayer}
          onDeletePlayer={handleDeletePlayer}
        />
      );
    }

    if (activeTab === 'matches') {
      return (
        <MatchesManager
          players={players}
          matches={matches}
          onCreateMatch={handleCreateMatch}
          onUpdateMatch={handleUpdateMatch}
          onDeleteMatch={handleDeleteMatch}
        />
      );
    }

    if (activeTab === 'history') {
      return <MatchHistoryManager matches={matches} />;
    }

    if (activeTab === 'weapons') {
      return (
        <WeaponsManager
          weapons={weapons}
          onAddWeapon={handleAddWeapon}
          onRemoveWeapon={handleRemoveWeapon}
        />
      );
    }

    if (activeTab === 'banned') {
      return (
        <BannedCharactersManager
          bannedCharacters={bannedCharacters}
          onAddCharacter={handleAddBannedCharacter}
          onRemoveCharacter={handleRemoveBannedCharacter}
        />
      );
    }

    if (activeTab === 'settings') {
      return (
        <SettingsManager
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onExportPlayers={exportPlayers}
          onExportMatches={exportMatches}
          onResetLeaderboard={handleResetLeaderboard}
          onClearMatches={handleClearMatches}
          onStartNewTournament={handleStartNewTournament}
        />
      );
    }

    return (
      <AdminDashboard
        players={players}
        matches={matches}
        leaderboard={leaderboard}
        weapons={weapons}
        bannedCharacters={bannedCharacters}
      />
    );
  }, [
    activeTab,
    players,
    matches,
    leaderboard,
    weapons,
    bannedCharacters,
    settings,
  ]);

  if (!isLoaded) {
    return (
      <div className="ui-page mt-10 max-w-3xl mx-auto">
        <div className="ui-card text-center">
          <p className="text-gray-300">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminLayout tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} onLogout={logout}>
        {tabContent}
      </AdminLayout>
      <Toast toast={toast} />
    </>
  );
}
