import { calculateLeaderboard } from './players';
import {
  matchResultsInput,
  scheduleStatusInput,
  groupAMatchesInput,
  groupBMatchesInput,
  knockoutMatchesInput,
} from './tournamentInput';

// ============================================
// TOURNAMENT AUTOMATION SYSTEM
// ============================================
// This system automatically:
// 1. Updates player stats when matches are completed
// 2. Recalculates leaderboard based on results
// 3. Qualifies top players to next stage
// 4. Generates next stage matches automatically
// ============================================

// --------------------------------------------
// GROUP STAGE MATCHES
// --------------------------------------------
const groupABaseMatches = groupAMatchesInput;

const groupBBaseMatches = groupBMatchesInput;

const applyResultsToGroupMatches = (baseMatches, groupInputRows) => {
  return baseMatches.map((match, index) => {
    const localGroupId = index + 1;
    const input = (groupInputRows || []).find((row) => Number(row.id) === localGroupId);
    if (!input) return match;

    const winner = input.winner === match.player1 || input.winner === match.player2
      ? input.winner
      : null;

    return {
      ...match,
      winner,
      kills: input.kills || {},
    };
  });
};

export const groupAMatches = applyResultsToGroupMatches(groupABaseMatches, matchResultsInput.groupA);
export const groupBMatches = applyResultsToGroupMatches(groupBBaseMatches, matchResultsInput.groupB);

// --------------------------------------------
// KNOCKOUT STAGE MATCHES - Auto-generated
// --------------------------------------------
export const knockoutMatches = knockoutMatchesInput;

// --------------------------------------------
// SCHEDULE UI OPTIONS (Developer Friendly)
// --------------------------------------------
export const scheduleUiOptions = {
  // Manage in src/data/tournamentInput.js only.
  matchControls: {
    groupA: scheduleStatusInput.groupA,
    groupB: scheduleStatusInput.groupB,
  },
  statusLabels: {
    pending: 'Pending',
    played: 'Match Played',
  },
};

const getMatchControl = (match, matchIndex = 0) => {
  const localMatchNumber = matchIndex + 1;
  const scheduleControlId = Number(match?.scheduleControlId);
  const directMatchId = Number(match?.id);
  const groupKey = match?.group === 'B' ? 'groupB' : 'groupA';
  const groupConfig = scheduleUiOptions.matchControls[groupKey] || [];

  // 1) Preferred: explicit control id passed from Schedule UI integration.
  if (Number.isFinite(scheduleControlId)) {
    const byScheduleControlId = groupConfig.find((item) => Number(item.id) === scheduleControlId);
    if (byScheduleControlId) return byScheduleControlId;
  }

  // 2) If actual numeric match id exists, try that directly.
  if (Number.isFinite(directMatchId)) {
    const byDirectMatchId = groupConfig.find((item) => Number(item.id) === directMatchId);
    if (byDirectMatchId) return byDirectMatchId;

    // Group B supports absolute ids 11..20 by mapping to local 1..10.
    if (groupKey === 'groupB' && directMatchId >= 11 && directMatchId <= 20) {
      const groupBLocalId = directMatchId - 10;
      const byGroupBLocalId = groupConfig.find((item) => Number(item.id) === groupBLocalId);
      if (byGroupBLocalId) return byGroupBLocalId;
    }
  }

  // 3) Final fallback by rendered order index (local in-group position).
  return groupConfig.find((item) => Number(item.id) === localMatchNumber) || null;
};

export const getScheduleDisplayStatus = (match, matchIndex = 0) => {
  const control = getMatchControl(match, matchIndex);

  if (control?.allowStart === true) return 'played';
  if (control?.allowStart === false || control?.allowStart === null) return 'pending';

  if (match?.winner) return 'played';
  return 'pending';
};

export const isScheduleStartEnabled = (match, matchIndex = 0) => {
  const control = getMatchControl(match, matchIndex);
  return control?.allowStart === null;
};

// --------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------

// Get all matches combined
export const getAllMatches = () => {
  return [...groupAMatches, ...groupBMatches];
};

// Get matches by stage
export const getMatchesByStage = (stage) => {
  if (stage === 'group') {
    return { groupA: groupAMatches, groupB: groupBMatches };
  }
  if (stage === 'semi') {
    return knockoutMatches.semiFinals;
  }
  if (stage === 'final') {
    return knockoutMatches.final;
  }
  return [];
};

// Get completed matches count
export const getCompletedMatchesCount = (matches) => {
  return matches.filter(m => m.winner !== null).length;
};

// Check if group stage is complete
export const isGroupStageComplete = () => {
  const aComplete = groupAMatches.every(m => m.winner !== null);
  const bComplete = groupBMatches.every(m => m.winner !== null);
  return aComplete && bComplete;
};

// Get qualified players from a group (top 4)
export const getQualifiedPlayers = (players, group) => {
  const groupPlayers = players.filter(p => p.group === group);
  const leaderboard = calculateLeaderboard(groupPlayers);
  return leaderboard.slice(0, 4);
};

// Auto-generate semi-final matches based on qualified players
export const generateSemiFinals = (qualifiedA, qualifiedB) => {
  if (!qualifiedA || !qualifiedB || qualifiedA.length < 2 || qualifiedB.length < 2) {
    return null;
  }
  
  // Match 1: #1 Group A vs #4 Group B
  // Match 2: #2 Group A vs #3 Group B
  return [
    {
      id: 'SF1',
      player1: qualifiedA[0].name,
      player2: qualifiedB[3].name,
      winner: null,
      stage: 'semi',
      kills: {}
    },
    {
      id: 'SF2',
      player1: qualifiedA[1].name,
      player2: qualifiedB[2].name,
      winner: null,
      stage: 'semi',
      kills: {}
    },
  ];
};

// Auto-generate final match based on semi-final winners
export const generateFinalMatch = (semiWinner1, semiWinner2) => {
  if (!semiWinner1 || !semiWinner2) {
    return null;
  }
  
  return {
    id: 'GF1',
    player1: semiWinner1,
    player2: semiWinner2,
    winner: null,
    stage: 'final',
    kills: {}
  };
};

// Get match status
export const getMatchStatus = (match) => {
  if (match.winner) return 'completed';
  if (match.player1 && match.player2) return 'scheduled';
  return 'pending';
};

// Get tournament progress
export const getTournamentProgress = () => {
  const totalGroupMatches = groupAMatches.length + groupBMatches.length;
  const completedGroupMatches = 
    groupAMatches.filter(m => m.winner !== null).length +
    groupBMatches.filter(m => m.winner !== null).length;
  
  const totalSemiMatches = knockoutMatches.semiFinals.length;
  const completedSemiMatches = knockoutMatches.semiFinals.filter(m => m.winner !== null).length;
  
  const finalComplete = knockoutMatches.final.winner !== null;
  
  return {
    group: {
      total: totalGroupMatches,
      completed: completedGroupMatches,
      percentage: Math.round((completedGroupMatches / totalGroupMatches) * 100)
    },
    semiFinals: {
      total: totalSemiMatches,
      completed: completedSemiMatches,
      percentage: Math.round((completedSemiMatches / totalSemiMatches) * 100)
    },
    final: {
      complete: finalComplete
    },
    overall: finalComplete ? 'complete' : 
      (completedSemiMatches === totalSemiMatches ? 'finals' :
        (completedGroupMatches === totalGroupMatches ? 'knockout' : 'group'))
  };
};