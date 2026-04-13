import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTournamentData } from '../hooks/useTournamentData';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import PlayersManager from '../components/admin/PlayersManager';
import MatchesManager from '../components/admin/MatchesManager';

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
  const { isLoaded, players, matches, addPlayer, updatePlayer, deletePlayer, addMatch, deleteMatch, getLeaderboard } = useTournamentData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 2600);
  };

  // Handle adding a player
  const handleAddPlayer = (payload) => {
    try {
      addPlayer(payload);
      showToast('success', 'Player added successfully.');
    } catch (err) {
      showToast('error', 'Failed to add player.');
    }
  };

  // Handle updating a player
  const handleUpdatePlayer = (id, payload) => {
    try {
      updatePlayer(id, payload);
      showToast('success', 'Player updated successfully.');
    } catch (err) {
      showToast('error', 'Failed to update player.');
    }
  };

  // Handle deleting a player
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

  // Handle creating a match
  const handleCreateMatch = (matchData) => {
    try {
      addMatch(matchData);
      showToast('success', 'Match created and stats updated.');
    } catch (err) {
      showToast('error', 'Failed to create match.');
    }
  };

  // Handle deleting a match
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
          onDeleteMatch={handleDeleteMatch}
        />
      );
    }

    return <AdminDashboard players={players} matches={matches} leaderboard={leaderboard} />;
  }, [activeTab, players, matches, leaderboard]);

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
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab} onLogout={logout}>
        {tabContent}
      </AdminLayout>
      <Toast toast={toast} />
    </>
  );
}
