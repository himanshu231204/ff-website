import { useState } from 'react';
import { players as staticPlayers } from '../data/players';

export function useLivePlayers() {
  const [players] = useState(staticPlayers);
  return players;
}
