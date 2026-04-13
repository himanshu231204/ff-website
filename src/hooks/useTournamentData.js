import { useState, useCallback, useEffect, useMemo } from 'react';

const STORAGE_KEYS = {
  PLAYERS: 'tournament_players',
  MATCHES: 'tournament_matches',
  WEAPONS: 'tournament_weapons',
  BANNED_CHARACTERS: 'tournament_banned_characters',
  SETTINGS: 'tournament_settings',
};

const DEFAULT_PLAYERS = [
  {
    id: 1,
    name: 'Priyanshu',
    level: 75,
    group: 'A',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
  {
    id: 2,
    name: 'Sunny',
    level: 70,
    group: 'A',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
  {
    id: 3,
    name: 'Rajdeepak',
    level: 66,
    group: 'A',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
  {
    id: 4,
    name: 'Suman',
    level: 62,
    group: 'A',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
  {
    id: 5,
    name: 'Himanshu',
    level: 57,
    group: 'A',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
  {
    id: 6,
    name: 'Devratan',
    level: 72,
    group: 'B',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
  {
    id: 7,
    name: 'Shubham',
    level: 69,
    group: 'B',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
  {
    id: 8,
    name: 'Dev',
    level: 64,
    group: 'B',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
  {
    id: 9,
    name: 'Rajnish',
    level: 61,
    group: 'B',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
  {
    id: 10,
    name: 'Chandan',
    level: 49,
    group: 'B',
    stats: { matchesPlayed: 0, wins: 0, losses: 0, totalScoreDifference: 0 },
  },
];

const DEFAULT_WEAPONS = [
  { id: 'w1', name: 'AWM-Y' },
  { id: 'w2', name: 'Kar98K' },
  { id: 'w3', name: 'Woodpecker' },
  { id: 'w4', name: 'AC80' },
  { id: 'w5', name: 'Groza (Normal)' },
  { id: 'w6', name: 'SVD' },
  { id: 'w7', name: 'XM8' },
  { id: 'w8', name: 'MP40' },
  { id: 'w9', name: 'Thompson (Normal)' },
  { id: 'w10', name: 'Bizon' },
  { id: 'w11', name: 'UMP' },
  { id: 'w12', name: 'MP5' },
  { id: 'w13', name: 'M1887' },
  { id: 'w14', name: 'Desert Eagle' },
];

const DEFAULT_BANNED_CHARACTERS = {
  active: [
    { id: 'a1', name: 'Ray' },
    { id: 'a2', name: 'Nero' },
    { id: 'a3', name: 'Morse' },
    { id: 'a4', name: 'Oscar' },
    { id: 'a5', name: 'Kassie' },
    { id: 'a6', name: 'Ryden' },
    { id: 'a7', name: 'Ignis' },
    { id: 'a8', name: 'Iris' },
    { id: 'a9', name: 'Dimitri' },
    { id: 'a10', name: 'Skyler' },
    { id: 'a11', name: 'A124' },
  ],
  passive: [{ id: 'p1', name: 'Sonia' }],
};

const DEFAULT_SETTINGS = {
  pointsPerWin: 2,
  nkrPrecision: 2,
  totalMatches: 20,
  groupSize: 5,
};

const DEFAULT_STATS = {
  matchesPlayed: 0,
  wins: 0,
  losses: 0,
  totalScoreDifference: 0,
};

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function normalizePlayer(player) {
  const stats = player.stats
    ? {
        matchesPlayed: Number(player.stats.matchesPlayed || 0),
        wins: Number(player.stats.wins || 0),
        losses: Number(player.stats.losses || 0),
        totalScoreDifference: Number(player.stats.totalScoreDifference || 0),
      }
    : {
        // Migration support from legacy flat fields.
        matchesPlayed: Number(player.matches || 0),
        wins: Number(player.wins || 0),
        losses: Number((player.matches || 0) - (player.wins || 0)),
        totalScoreDifference: Number(player.totalScoreDifference || player.kills || 0),
      };

  return {
    id: player.id,
    name: player.name,
    level: Number(player.level || 1),
    group: player.group || 'A',
    stats,
  };
}

function resolveWinnerFromScores(player1, player2, score1, score2, winnerFallback) {
  if (Number(score1) > Number(score2)) return player1;
  if (Number(score2) > Number(score1)) return player2;
  return winnerFallback || null;
}

function normalizeMatch(match) {
  const score1 = Number(match.score1 ?? match.kills?.[match.player1] ?? 0);
  const score2 = Number(match.score2 ?? match.kills?.[match.player2] ?? 0);
  const winner = resolveWinnerFromScores(match.player1, match.player2, score1, score2, match.winner);
  const now = new Date().toISOString();

  return {
    id: match.id || Date.now(),
    player1: match.player1,
    player2: match.player2,
    score1,
    score2,
    winner,
    scoreDifference: Math.abs(score1 - score2),
    stage: match.stage || 'group',
    scheduledAt: match.scheduledAt || match.timestamp || now,
    createdAt: match.createdAt || match.timestamp || now,
    updatedAt: match.updatedAt || now,
  };
}

function computePlayersFromMatches(basePlayers, matches) {
  const nextPlayers = basePlayers.map((player) => ({
    ...player,
    stats: { ...DEFAULT_STATS },
  }));

  const byName = new Map(nextPlayers.map((p) => [p.name, p]));

  matches.forEach((match) => {
    const p1 = byName.get(match.player1);
    const p2 = byName.get(match.player2);
    if (!p1 || !p2) return;

    const score1 = Number(match.score1 || 0);
    const score2 = Number(match.score2 || 0);
    const diff = Math.abs(score1 - score2);
    const winner = resolveWinnerFromScores(match.player1, match.player2, score1, score2, match.winner);

    p1.stats.matchesPlayed += 1;
    p2.stats.matchesPlayed += 1;

    const p1Winner = winner === p1.name;
    const p2Winner = winner === p2.name;
    const hasWinner = Boolean(winner);

    p1.stats.wins += p1Winner ? 1 : 0;
    p2.stats.wins += p2Winner ? 1 : 0;
    p1.stats.losses += hasWinner && !p1Winner ? 1 : 0;
    p2.stats.losses += hasWinner && !p2Winner ? 1 : 0;

    p1.stats.totalScoreDifference += p1Winner ? diff : -diff;
    p2.stats.totalScoreDifference += p2Winner ? diff : -diff;
  });

  return nextPlayers;
}

function toMatchPayload(matchData) {
  const {
    id = Date.now(),
    player1Name,
    player2Name,
    score1,
    score2,
    stage,
    scheduledAt,
    createdAt,
    updatedAt,
  } = matchData;

  const parsedScore1 = Number(score1) || 0;
  const parsedScore2 = Number(score2) || 0;
  const resolvedWinner = resolveWinnerFromScores(player1Name, player2Name, parsedScore1, parsedScore2);
  const now = new Date().toISOString();

  return {
    id,
    player1: player1Name,
    player2: player2Name,
    winner: resolvedWinner,
    score1: parsedScore1,
    score2: parsedScore2,
    scoreDifference: Math.abs(parsedScore1 - parsedScore2),
    stage: stage || 'group',
    scheduledAt: scheduledAt || now,
    createdAt: createdAt || now,
    updatedAt: updatedAt || now,
  };
}

function downloadJsonFile(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function useTournamentData() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [bannedCharacters, setBannedCharacters] = useState({ active: [], passive: [] });
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const rawPlayers = safeParse(localStorage.getItem(STORAGE_KEYS.PLAYERS), DEFAULT_PLAYERS);
    const rawMatches = safeParse(localStorage.getItem(STORAGE_KEYS.MATCHES), []);
    const savedPlayers = rawPlayers.map(normalizePlayer);
    const savedMatches = rawMatches.map(normalizeMatch);
    const savedWeapons = safeParse(localStorage.getItem(STORAGE_KEYS.WEAPONS), DEFAULT_WEAPONS);
    const savedBanned = safeParse(
      localStorage.getItem(STORAGE_KEYS.BANNED_CHARACTERS),
      DEFAULT_BANNED_CHARACTERS,
    );
    const loadedSettings = safeParse(localStorage.getItem(STORAGE_KEYS.SETTINGS), DEFAULT_SETTINGS);
    const savedSettings = {
      ...loadedSettings,
      // Migration support for old killRatePrecision key.
      nkrPrecision: Number(loadedSettings.nkrPrecision ?? loadedSettings.killRatePrecision ?? DEFAULT_SETTINGS.nkrPrecision),
    };

    const normalizedPlayers = computePlayersFromMatches(savedPlayers, savedMatches);
    setPlayers(normalizedPlayers);
    setMatches(savedMatches);
    setWeapons(savedWeapons);
    setBannedCharacters(savedBanned);
    setSettings({ ...DEFAULT_SETTINGS, ...savedSettings });

    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(normalizedPlayers));
    setIsLoaded(true);
  }, []);

  const savePlayers = useCallback((nextPlayers) => {
    setPlayers(nextPlayers);
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(nextPlayers));
  }, []);

  const saveMatches = useCallback((nextMatches, basePlayers = players) => {
    setMatches(nextMatches);
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(nextMatches));
    const recomputed = computePlayersFromMatches(basePlayers, nextMatches);
    savePlayers(recomputed);
  }, [players, savePlayers]);

  const saveWeapons = useCallback((nextWeapons) => {
    setWeapons(nextWeapons);
    localStorage.setItem(STORAGE_KEYS.WEAPONS, JSON.stringify(nextWeapons));
  }, []);

  const saveBannedCharacters = useCallback((nextBanned) => {
    setBannedCharacters(nextBanned);
    localStorage.setItem(STORAGE_KEYS.BANNED_CHARACTERS, JSON.stringify(nextBanned));
  }, []);

  const saveSettings = useCallback((nextSettings) => {
    setSettings(nextSettings);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(nextSettings));
  }, []);

  const addPlayer = useCallback((playerData) => {
    const newPlayer = {
      id: Date.now(),
      name: playerData.name.trim(),
      level: Number(playerData.level) || 1,
      group: playerData.group || 'A',
      stats: { ...DEFAULT_STATS },
    };
    const nextPlayers = [...players, newPlayer];
    savePlayers(nextPlayers);
    return newPlayer;
  }, [players, savePlayers]);

  const updatePlayer = useCallback((id, updates) => {
    const player = players.find((p) => p.id === id);
    if (!player) return;

    const nextPlayers = players.map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        ...updates,
        name: updates.name ? updates.name.trim() : p.name,
        level: updates.level ? Number(updates.level) : p.level,
        stats: p.stats,
      };
    });

    if (updates.name && updates.name.trim() !== player.name) {
      const renamedMatches = matches.map((m) => {
        const updatedMatch = { ...m };
        if (m.player1 === player.name) updatedMatch.player1 = updates.name.trim();
        if (m.player2 === player.name) updatedMatch.player2 = updates.name.trim();
        if (m.winner === player.name) updatedMatch.winner = updates.name.trim();
        return updatedMatch;
      });
      savePlayers(nextPlayers);
      saveMatches(renamedMatches, nextPlayers);
      return;
    }

    savePlayers(nextPlayers);
  }, [players, matches, savePlayers, saveMatches]);

  const deletePlayer = useCallback((id) => {
    const target = players.find((p) => p.id === id);
    if (!target) return;
    const nextPlayers = players.filter((p) => p.id !== id);
    const nextMatches = matches.filter(
      (m) => m.player1 !== target.name && m.player2 !== target.name,
    );
    savePlayers(nextPlayers);
    saveMatches(nextMatches, nextPlayers);
  }, [players, matches, savePlayers, saveMatches]);

  const addMatch = useCallback((matchData) => {
    const newMatch = toMatchPayload(matchData);
    if (newMatch.score1 === newMatch.score2) {
      throw new Error('Score cannot be tied.');
    }
    const nextMatches = [...matches, newMatch];
    saveMatches(nextMatches);
    return newMatch;
  }, [matches, saveMatches]);

  const updateMatch = useCallback((matchId, updates) => {
    const current = matches.find((m) => m.id === matchId);
    if (!current) return;

    const nextMatches = matches.map((m) => {
      if (m.id !== matchId) return m;
      return toMatchPayload({
        id: m.id,
        player1Name: updates.player1Name || m.player1,
        player2Name: updates.player2Name || m.player2,
        score1: updates.score1 ?? m.score1,
        score2: updates.score2 ?? m.score2,
        stage: updates.stage || m.stage,
        scheduledAt: updates.scheduledAt || m.scheduledAt,
        createdAt: m.createdAt,
        updatedAt: new Date().toISOString(),
      });
    });

    const updatedMatch = nextMatches.find((m) => m.id === matchId);
    if (updatedMatch && updatedMatch.score1 === updatedMatch.score2) {
      throw new Error('Score cannot be tied.');
    }

    saveMatches(nextMatches);
  }, [matches, saveMatches]);

  const deleteMatch = useCallback((matchId) => {
    const nextMatches = matches.filter((m) => m.id !== matchId);
    saveMatches(nextMatches);
  }, [matches, saveMatches]);

  const addWeapon = useCallback((weaponName) => {
    const cleanName = weaponName.trim();
    if (!cleanName) return;
    const exists = weapons.some((w) => w.name.toLowerCase() === cleanName.toLowerCase());
    if (exists) return;
    const nextWeapons = [...weapons, { id: Date.now().toString(), name: cleanName }];
    saveWeapons(nextWeapons);
  }, [weapons, saveWeapons]);

  const removeWeapon = useCallback((weaponId) => {
    const nextWeapons = weapons.filter((w) => w.id !== weaponId);
    saveWeapons(nextWeapons);
  }, [weapons, saveWeapons]);

  const addBannedCharacter = useCallback((type, name) => {
    const bucket = type === 'passive' ? 'passive' : 'active';
    const cleanName = name.trim();
    if (!cleanName) return;

    const duplicate = bannedCharacters[bucket].some(
      (c) => c.name.toLowerCase() === cleanName.toLowerCase(),
    );
    if (duplicate) return;

    const next = {
      ...bannedCharacters,
      [bucket]: [...bannedCharacters[bucket], { id: Date.now().toString(), name: cleanName }],
    };
    saveBannedCharacters(next);
  }, [bannedCharacters, saveBannedCharacters]);

  const removeBannedCharacter = useCallback((type, id) => {
    const bucket = type === 'passive' ? 'passive' : 'active';
    const next = {
      ...bannedCharacters,
      [bucket]: bannedCharacters[bucket].filter((c) => c.id !== id),
    };
    saveBannedCharacters(next);
  }, [bannedCharacters, saveBannedCharacters]);

  const updateSettings = useCallback((updates) => {
    const nextSettings = {
      ...settings,
      ...updates,
      pointsPerWin: Number(updates.pointsPerWin ?? settings.pointsPerWin),
      nkrPrecision: Number(updates.nkrPrecision ?? settings.nkrPrecision),
      totalMatches: Number(updates.totalMatches ?? settings.totalMatches),
      groupSize: Number(updates.groupSize ?? settings.groupSize),
    };
    saveSettings(nextSettings);
  }, [settings, saveSettings]);

  const resetLeaderboard = useCallback(() => {
    const basePlayers = players.map((p) => ({
      ...p,
      stats: { ...DEFAULT_STATS },
    }));
    savePlayers(basePlayers);
    saveMatches([], basePlayers);
  }, [players, savePlayers, saveMatches]);

  const clearMatches = useCallback(() => {
    saveMatches([]);
  }, [saveMatches]);

  const startNewTournament = useCallback(() => {
    const freshPlayers = DEFAULT_PLAYERS.map((p) => ({ ...p }));
    savePlayers(freshPlayers);
    saveMatches([], freshPlayers);
    saveWeapons(DEFAULT_WEAPONS);
    saveBannedCharacters(DEFAULT_BANNED_CHARACTERS);
    saveSettings(DEFAULT_SETTINGS);
  }, [savePlayers, saveMatches, saveWeapons, saveBannedCharacters, saveSettings]);

  const exportPlayers = useCallback(() => {
    downloadJsonFile('players.json', players);
  }, [players]);

  const exportMatches = useCallback(() => {
    downloadJsonFile('matches.json', matches);
  }, [matches]);

  const getLeaderboard = useCallback((playerList = players) => {
    return playerList
      .map((p) => {
        const matchesPlayed = Number(p.stats?.matchesPlayed || 0);
        const wins = Number(p.stats?.wins || 0);
        const losses = Number(p.stats?.losses || 0);
        const totalScoreDifference = Number(p.stats?.totalScoreDifference || 0);
        const points = wins * settings.pointsPerWin;
        const factor = 10 ** settings.nkrPrecision;
        const nkrRaw = matchesPlayed > 0 ? totalScoreDifference / matchesPlayed : 0;
        const nkr = Math.round(nkrRaw * factor) / factor;

        return {
          ...p,
          matchesPlayed,
          wins,
          losses,
          totalScoreDifference,
          points,
          nkr,
        };
      })
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.nkr !== a.nkr) return b.nkr - a.nkr;
        return b.wins - a.wins;
      });
  }, [players, settings]);

  const getGroupLeaderboard = useCallback((group) => {
    const groupPlayers = players.filter((p) => p.group === group);
    return getLeaderboard(groupPlayers);
  }, [players, getLeaderboard]);

  const leaderboard = useMemo(() => getLeaderboard(players), [players, getLeaderboard]);

  return {
    isLoaded,
    players,
    matches,
    weapons,
    bannedCharacters,
    settings,
    leaderboard,
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
    getGroupLeaderboard,
  };
}
