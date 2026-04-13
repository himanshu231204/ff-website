export const players = [
  { id: 1, name: 'Priyanshu', level: 75, group: 'A', matches: 4, wins: 3, kills: 14 },
  { id: 2, name: 'Sunny', level: 70, group: 'A', matches: 4, wins: 2, kills: 12 },
  { id: 3, name: 'Rajdeepak', level: 66, group: 'A', matches: 4, wins: 2, kills: 10 },
  { id: 4, name: 'Suman', level: 62, group: 'A', matches: 4, wins: 1, kills: 8 },
  { id: 5, name: 'Himanshu', level: 57, group: 'A', matches: 4, wins: 4, kills: 30 },
  { id: 6, name: 'Devratan', level: 72, group: 'B', matches: 4, wins: 3, kills: 15 },
  { id: 7, name: 'Shubham', level: 69, group: 'B', matches: 4, wins: 3, kills: 13 },
  { id: 8, name: 'Dev', level: 64, group: 'B', matches: 4, wins: 2, kills: 11 },
  { id: 9, name: 'Rajnish', level: 61, group: 'B', matches: 4, wins: 1, kills: 9 },
  { id: 10, name: 'Chandan', level: 49, group: 'B', matches: 4, wins: 1, kills: 7 },
];

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
        finalScore: finalScore.toFixed(2)
      };
    })
    .sort((a, b) => {
      // Sort by: Final Score DESC → KR DESC → Wins DESC
      const aScore = parseFloat(a.finalScore);
      const bScore = parseFloat(b.finalScore);
      
      if (bScore !== aScore) return bScore - aScore;
      
      const aKR = parseFloat(a.kr);
      const bKR = parseFloat(b.kr);
      if (bKR !== aKR) return bKR - aKR;
      
      return b.wins - a.wins;
    });
};