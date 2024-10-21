// src/lib/logic/playerLogic.ts
import { goto } from '$app/navigation';
import type { Player } from '$lib/server/sql/dbTypes';

export async function searchPlayer(searchTerm: string): Promise<Player[]> {
  const response = await fetch(`/api/search-player?searchTerm=${searchTerm}`);
  if (response.ok) {
    const data = await response.json();
    return data.players || [];
  }
  return [];
}

export async function handleNavigation(event: Event, nameId: number, playerName: string) {
  event.preventDefault();
  await goto(`/player/${nameId}/${playerName.replace(/ /g, '-').toLowerCase()}`);
}

export function handleKeydown(event: KeyboardEvent, nameId: number, playerName: string) {
  if (event.key === 'Enter' || event.key === ' ') {
    handleNavigation(event, nameId, playerName);
  }
}


