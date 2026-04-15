import { playersInput } from './tournamentInput';

export const players = playersInput;

// Dynamic leaderboard calculation - no hardcoded values
// When player data changes, this function auto-calculates all stats
export const calculateLeaderboard = (playerList) => {
  return [...playerList]
    .map((player) => {
      const matches = player.matches || 0;
      const wins = player.wins || 0;
      const kills = player.kills || 0;

      const points = wins * 2;
      const kr = matches > 0 ? kills / matches : 0;
      const finalScore = points + kr;

      return {
        ...player,
        points,
        kr: kr.toFixed(2),
        finalScore: finalScore.toFixed(2),
      };
    })
    .sort((a, b) => {
      const aScore = parseFloat(a.finalScore);
      const bScore = parseFloat(b.finalScore);

      if (bScore !== aScore) return bScore - aScore;

      const aKR = parseFloat(a.kr);
      const bKR = parseFloat(b.kr);
      if (bKR !== aKR) return bKR - aKR;

      return b.wins - a.wins;
    });
};
