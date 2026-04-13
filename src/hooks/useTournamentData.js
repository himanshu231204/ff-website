import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEYS = {
  PLAYERS: 'tournament_players',
  MATCHES: 'tournament_matches',
};

// Default starter players
const DEFAULT_PLAYERS = [
  { id: 1, name: 'Priyanshu', level: 75, group: 'A', matches: 0, wins: 0, kills: 0 },
  { id: 2, name: 'Sunny', level: 70, group: 'A', matches: 0, wins: 0, kills: 0 },
  { id: 3, name: 'Rajdeepak', level: 66, group: 'A', matches: 0, wins: 0, kills: 0 },
  { id: 4, name: 'Suman', level: 62, group: 'A', matches: 0, wins: 0, kills: 0 },
  { id: 5, name: 'Himanshu', level: 57, group: 'A', matches: 0, wins: 0, kills: 0 },
  { id: 6, name: 'Devratan', level: 72, group: 'B', matches: 0, wins: 0, kills: 0 },
  { id: 7, name: 'Shubham', level: 69, group: 'B', matches: 0, wins: 0, kills: 0 },
  { id: 8, name: 'Dev', level: 64, group: 'B', matches: 0, wins: 0, kills: 0 },
  { id: 9, name: 'Rajnish', level: 61, group: 'B', matches: 0, wins: 0, kills: 0 },
  { id: 10, name: 'Chandan', level: 49, group: 'B', matches: 0, wins: 0, kills: 0 },
];

export function useTournamentData() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data from localStorage
  useEffect(() => {
    const savedPlayers = localStorage.getItem(STORAGE_KEYS.PLAYERS);
    const savedMatches = localStorage.getItem(STORAGE_KEYS.MATCHES);

    try {
      setPlayers(savedPlayers ? JSON.parse(savedPlayers) : DEFAULT_PLAYERS);
      setMatches(savedMatches ? JSON.parse(savedMatches) : []);
    } catch (err) {
      console.error('Error loading data from localStorage:', err);
      setPlayers(DEFAULT_PLAYERS);
      setMatches([]);
    }
    setIsLoaded(true);
  }, []);

  // Save players to localStorage
  const savePlayers = useCallback((updatedPlayers) => {
    setPlayers(updatedPlayers);
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updatedPlayers));
  }, []);

  // Save matches to localStorage
  const saveMatches = useCallback((updatedMatches) => {
    setMatches(updatedMatches);
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(updatedMatches));
  }, []);

  // Add player
  const addPlayer = useCallback((playerData) => {
    const newPlayer = {
      id: Date.now(),
      ...playerData,
      matches: 0,
      wins: 0,
      kills: 0,
    };
    const updated = [...players, newPlayer];
    savePlayers(updated);
    return newPlayer;
  }, [players, savePlayers]);

  // Update player
  const updatePlayer = useCallback((id, updates) => {
    const updated = players.map(p => p.id === id ? { ...p, ...updates } : p);
    savePlayers(updated);
  }, [players, savePlayers]);

  // Delete player
  const deletePlayer = useCallback((id) => {
    const updated = players.filter(p => p.id !== id);
    savePlayers(updated);
  }, [players, savePlayers]);

  // Add match and auto-update player stats
  const addMatch = useCallback((matchData) => {
    const { player1Name, player2Name, winnerId, kills1, kills2, stage } = matchData;

    // Create match record
    const newMatch = {
      id: Date.now(),
      player1: player1Name,
      player2: player2Name,
      winner: winnerId === 'player1' ? player1Name : player2Name,
      kills: {
        [player1Name]: kills1,
        [player2Name]: kills2,
      },
      stage,
      timestamp: new Date().toISOString(),
    };

    // Update player stats
    const updatedPlayers = players.map((p) => {
      if (p.name === player1Name) {
        return {
          ...p,
          matches: p.matches + 1,
          wins: winnerId === 'player1' ? p.wins + 1 : p.wins,
          kills: p.kills + kills1,
        };
      }
      if (p.name === player2Name) {
        return {
          ...p,
          matches: p.matches + 1,
          wins: winnerId === 'player2' ? p.wins + 1 : p.wins,
          kills: p.kills + kills2,
        };
      }
      return p;
    });

    savePlayers(updatedPlayers);
    const updatedMatches = [...matches, newMatch];
    saveMatches(updatedMatches);
    return newMatch;
  }, [players, matches, savePlayers, saveMatches]);

  // Delete match and revert player stats
  const deleteMatch = useCallback((matchId) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    // Revert player stats
    const updatedPlayers = players.map((p) => {
      if (p.name === match.player1) {
        return {
          ...p,
          matches: Math.max(0, p.matches - 1),
          wins: match.winner === match.player1 ? Math.max(0, p.wins - 1) : p.wins,
          kills: Math.max(0, p.kills - (match.kills[match.player1] || 0)),
        };
      }
      if (p.name === match.player2) {
        return {
          ...p,
          matches: Math.max(0, p.matches - 1),
          wins: match.winner === match.player2 ? Math.max(0, p.wins - 1) : p.wins,
          kills: Math.max(0, p.kills - (match.kills[match.player2] || 0)),
        };
      }
      return p;
    });

    savePlayers(updatedPlayers);
    const updatedMatches = matches.filter(m => m.id !== matchId);
    saveMatches(updatedMatches);
  }, [players, matches, savePlayers, saveMatches]);

  // Calculate leaderboard with scores
  const getLeaderboard = useCallback((playerList = players) => {
    return playerList
      .map((p) => {
        const points = p.wins * 2;
        const kr = p.matches > 0 ? p.kills / p.matches : 0;
        const finalScore = points + kr;

        return {
          ...p,
          points,
          kr: parseFloat(kr.toFixed(2)),
          finalScore: parseFloat(finalScore.toFixed(2)),
        };
      })
      .sort((a, b) => {
        if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
        if (b.kr !== a.kr) return b.kr - a.kr;
        return b.wins - a.wins;
      });
  }, [players]);

  // Get group leaderboard
  const getGroupLeaderboard = useCallback((group) => {
    const groupPlayers = players.filter(p => p.group === group);
    return getLeaderboard(groupPlayers);
  }, [players, getLeaderboard]);

  return {
    isLoaded,
    players,
    matches,
    addPlayer,
    updatePlayer,
    deletePlayer,
    addMatch,
    deleteMatch,
    getLeaderboard,
    getGroupLeaderboard,
  };
}
