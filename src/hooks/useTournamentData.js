import { useState, useCallback, useEffect, useMemo } from 'react';
import { getAllMatches as getStaticMatches } from '../data/matches';

const STORAGE_KEYS = {
  PLAYERS: 'tournament_players',
  MATCHES: 'tournament_matches',
  WEAPONS: 'tournament_weapons',
  BANNED_CHARACTERS: 'tournament_banned_characters',
  SETTINGS: 'tournament_settings',
};

const STORAGE_SYNC_EVENT = 'tournament_data_sync';

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

const MATCHES_SOURCE = 'matches-js';

const DEFAULT_MATCHES = getStaticMatches().map((match) => {
  const p1Kills = Number(match.kills?.[match.player1] ?? 0);
  const p2Kills = Number(match.kills?.[match.player2] ?? 0);
  const winner = match.winner;

  const score1 = p1Kills || (winner === match.player1 ? 1 : 0);
  const score2 = p2Kills || (winner === match.player2 ? 1 : 0);

  return {
    ...match,
    score1,
    score2,
  };
});

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

function isMatchCompleted(match) {
  const score1 = Number(match.score1 ?? 0);
  const score2 = Number(match.score2 ?? 0);
  const winner = match.winner;
  const hasDeclaredWinner = winner === match.player1 || winner === match.player2;

  if (!hasDeclaredWinner) return false;

  // If winner is manually set in matches.js, treat it as completed even when scores are equal.
  if (score1 === score2) return true;

  return true;
}

function toPairKey(player1, player2) {
  return [player1, player2].sort((a, b) => a.localeCompare(b)).join('::');
}

function generateGroupStageFixtures(group, groupPlayers, completedPairs, startOffset = 0) {
  const names = [...new Set(groupPlayers.map((p) => p.name).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const now = Date.now();
  const fixtures = [];
  let offset = startOffset;

  for (let i = 0; i < names.length; i += 1) {
    for (let j = i + 1; j < names.length; j += 1) {
      const player1 = names[i];
      const player2 = names[j];
      const pairKey = toPairKey(player1, player2);

      if (completedPairs.has(pairKey)) continue;

      fixtures.push({
        id: `sched_${group}_${pairKey}_${offset}_${now}`,
        player1,
        player2,
        score1: 0,
        score2: 0,
        winner: null,
        scoreDifference: 0,
        stage: 'group',
        group,
        round: offset + 1,
        isAutoScheduled: true,
        scheduledAt: new Date(now + (offset + 1) * 3600000).toISOString(),
        createdAt: new Date(now).toISOString(),
        updatedAt: new Date(now).toISOString(),
      });

      offset += 1;
    }
  }

  return fixtures;
}

function ensureGroupStageSchedule(playerList, matchList) {
  const playerGroupMap = new Map(playerList.map((p) => [p.name, p.group]));
  const groups = [...new Set(playerList.map((p) => p.group).filter(Boolean))].sort((a, b) => a.localeCompare(b));

  const groupMatches = matchList.filter((m) => (m.stage || 'group') === 'group');
  const completedGroupMatches = groupMatches.filter(isMatchCompleted).map((m) => ({
    ...m,
    group: m.group || playerGroupMap.get(m.player1) || playerGroupMap.get(m.player2) || 'A',
    isAutoScheduled: Boolean(m.isAutoScheduled),
  }));

  const completedPairMap = new Map(groups.map((group) => [group, new Set()]));
  completedGroupMatches.forEach((m) => {
    const group = m.group || 'A';
    if (!completedPairMap.has(group)) {
      completedPairMap.set(group, new Set());
    }
    completedPairMap.get(group).add(toPairKey(m.player1, m.player2));
  });

  const otherStageMatches = matchList.filter((m) => (m.stage || 'group') !== 'group');

  let offset = 0;
  const scheduledGroupMatches = groups.flatMap((group) => {
    const groupPlayers = playerList.filter((p) => p.group === group);
    const completedPairs = completedPairMap.get(group) || new Set();
    const fixtures = generateGroupStageFixtures(group, groupPlayers, completedPairs, offset);
    offset += fixtures.length;
    return fixtures;
  });

  return [...otherStageMatches, ...completedGroupMatches, ...scheduledGroupMatches];
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
    group: match.group || null,
    round: Number(match.round || 0),
    isAutoScheduled: Boolean(match.isAutoScheduled),
    startedAt: match.startedAt || null,
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
    if (!isMatchCompleted(match)) return;

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
    group,
    startedAt,
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
    group: group || null,
    startedAt: startedAt || null,
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

  const emitStorageSync = useCallback(() => {
    window.dispatchEvent(new CustomEvent(STORAGE_SYNC_EVENT));
  }, []);

  const hydrateFromStorage = useCallback(() => {
    const rawPlayers = safeParse(localStorage.getItem(STORAGE_KEYS.PLAYERS), DEFAULT_PLAYERS);
    const rawMatches = MATCHES_SOURCE === 'matches-js'
      ? DEFAULT_MATCHES
      : safeParse(localStorage.getItem(STORAGE_KEYS.MATCHES), []);
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

    const normalizedMatches = ensureGroupStageSchedule(savedPlayers, savedMatches);
    const normalizedPlayers = computePlayersFromMatches(savedPlayers, normalizedMatches);

    setPlayers(normalizedPlayers);
    setMatches(normalizedMatches);
    setWeapons(savedWeapons);
    setBannedCharacters(savedBanned);
    setSettings({ ...DEFAULT_SETTINGS, ...savedSettings });

    const playersString = JSON.stringify(normalizedPlayers);
    if (localStorage.getItem(STORAGE_KEYS.PLAYERS) !== playersString) {
      localStorage.setItem(STORAGE_KEYS.PLAYERS, playersString);
    }

    const matchesString = JSON.stringify(normalizedMatches);
    if (localStorage.getItem(STORAGE_KEYS.MATCHES) !== matchesString) {
      localStorage.setItem(STORAGE_KEYS.MATCHES, matchesString);
    }
  }, []);

  useEffect(() => {
    hydrateFromStorage();
    setIsLoaded(true);
  }, [hydrateFromStorage]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (!event.key || Object.values(STORAGE_KEYS).includes(event.key)) {
        hydrateFromStorage();
      }
    };

    const handleLocalSync = () => {
      hydrateFromStorage();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(STORAGE_SYNC_EVENT, handleLocalSync);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(STORAGE_SYNC_EVENT, handleLocalSync);
    };
  }, [hydrateFromStorage]);

  const savePlayers = useCallback((nextPlayers) => {
    setPlayers(nextPlayers);
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(nextPlayers));
    emitStorageSync();
  }, [emitStorageSync]);

  const saveMatches = useCallback((nextMatches, basePlayers = players) => {
    setMatches(nextMatches);
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(nextMatches));
    const recomputed = computePlayersFromMatches(basePlayers, nextMatches);
    savePlayers(recomputed);
    emitStorageSync();
  }, [players, savePlayers, emitStorageSync]);

  const saveWeapons = useCallback((nextWeapons) => {
    setWeapons(nextWeapons);
    localStorage.setItem(STORAGE_KEYS.WEAPONS, JSON.stringify(nextWeapons));
    emitStorageSync();
  }, [emitStorageSync]);

  const saveBannedCharacters = useCallback((nextBanned) => {
    setBannedCharacters(nextBanned);
    localStorage.setItem(STORAGE_KEYS.BANNED_CHARACTERS, JSON.stringify(nextBanned));
    emitStorageSync();
  }, [emitStorageSync]);

  const saveSettings = useCallback((nextSettings) => {
    setSettings(nextSettings);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(nextSettings));
    emitStorageSync();
  }, [emitStorageSync]);

  const addPlayer = useCallback((playerData) => {
    const newPlayer = {
      id: Date.now(),
      name: playerData.name.trim(),
      level: Number(playerData.level) || 1,
      group: playerData.group || 'A',
      stats: { ...DEFAULT_STATS },
    };
    const nextPlayers = [...players, newPlayer];
    const nextMatches = ensureGroupStageSchedule(nextPlayers, matches);
    saveMatches(nextMatches, nextPlayers);
    return newPlayer;
  }, [players, matches, saveMatches]);

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

    const isRenamed = Boolean(updates.name && updates.name.trim() !== player.name);
    const groupChanged = Boolean(updates.group && updates.group !== player.group);

    if (isRenamed || groupChanged) {
      const renamedMatches = matches.map((m) => {
        const updatedMatch = { ...m };
        if (isRenamed) {
          if (m.player1 === player.name) updatedMatch.player1 = updates.name.trim();
          if (m.player2 === player.name) updatedMatch.player2 = updates.name.trim();
          if (m.winner === player.name) updatedMatch.winner = updates.name.trim();
        }
        return updatedMatch;
      });
      const refreshedMatches = ensureGroupStageSchedule(nextPlayers, renamedMatches);
      saveMatches(refreshedMatches, nextPlayers);
      return;
    }

    savePlayers(nextPlayers);
  }, [players, matches, savePlayers, saveMatches]);

  const deletePlayer = useCallback((id) => {
    const target = players.find((p) => p.id === id);
    if (!target) return;
    const nextPlayers = players.filter((p) => p.id !== id);
    const matchesWithoutDeletedPlayer = matches.filter(
      (m) => m.player1 !== target.name && m.player2 !== target.name,
    );
    const nextMatches = ensureGroupStageSchedule(nextPlayers, matchesWithoutDeletedPlayer);
    saveMatches(nextMatches, nextPlayers);
  }, [players, matches, saveMatches]);

  const addMatch = useCallback((matchData) => {
    const player1 = players.find((p) => p.name === matchData.player1Name);
    const player2 = players.find((p) => p.name === matchData.player2Name);
    const inferredGroup = player1 && player2 && player1.group === player2.group ? player1.group : null;

    const newMatch = toMatchPayload({
      ...matchData,
      group: matchData.group || inferredGroup,
    });
    if (newMatch.score1 === newMatch.score2) {
      throw new Error('Score cannot be tied.');
    }
    const nextMatches = ensureGroupStageSchedule(players, [...matches, newMatch]);
    saveMatches(nextMatches);
    return newMatch;
  }, [players, matches, saveMatches]);

  const updateMatch = useCallback((matchId, updates) => {
    const current = matches.find((m) => m.id === matchId);
    if (!current) return;

    const nextMatches = matches.map((m) => {
      if (m.id !== matchId) return m;

      const nextPlayer1 = updates.player1Name || m.player1;
      const nextPlayer2 = updates.player2Name || m.player2;
      const p1 = players.find((p) => p.name === nextPlayer1);
      const p2 = players.find((p) => p.name === nextPlayer2);
      const inferredGroup = p1 && p2 && p1.group === p2.group ? p1.group : m.group;

      return toMatchPayload({
        id: m.id,
        player1Name: nextPlayer1,
        player2Name: nextPlayer2,
        score1: updates.score1 ?? m.score1,
        score2: updates.score2 ?? m.score2,
        stage: updates.stage || m.stage,
        group: updates.group || inferredGroup,
        startedAt: updates.startedAt ?? m.startedAt,
        scheduledAt: updates.scheduledAt || m.scheduledAt,
        createdAt: m.createdAt,
        updatedAt: new Date().toISOString(),
      });
    });

    const updatedMatch = nextMatches.find((m) => m.id === matchId);
    const hasScoreChange = Object.prototype.hasOwnProperty.call(updates, 'score1')
      || Object.prototype.hasOwnProperty.call(updates, 'score2')
      || Object.prototype.hasOwnProperty.call(updates, 'player1Name')
      || Object.prototype.hasOwnProperty.call(updates, 'player2Name');

    if (hasScoreChange && updatedMatch && updatedMatch.score1 === updatedMatch.score2) {
      throw new Error('Score cannot be tied.');
    }

    const refreshedMatches = ensureGroupStageSchedule(players, nextMatches);
    saveMatches(refreshedMatches);
  }, [players, matches, saveMatches]);

  const deleteMatch = useCallback((matchId) => {
    const nextMatches = ensureGroupStageSchedule(players, matches.filter((m) => m.id !== matchId));
    saveMatches(nextMatches);
  }, [players, matches, saveMatches]);

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
    const freshMatches = ensureGroupStageSchedule(freshPlayers, []);
    saveMatches(freshMatches, freshPlayers);
    saveWeapons(DEFAULT_WEAPONS);
    saveBannedCharacters(DEFAULT_BANNED_CHARACTERS);
    saveSettings(DEFAULT_SETTINGS);
  }, [saveMatches, saveWeapons, saveBannedCharacters, saveSettings]);

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
