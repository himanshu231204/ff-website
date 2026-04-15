import { useState } from 'react';
import { playersInput as staticPlayers } from '../data/tournamentInput';

export function useLivePlayers() {
  const [players] = useState(staticPlayers);
  return players;
}
