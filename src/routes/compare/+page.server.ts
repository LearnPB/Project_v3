// src/routes/compare/+page.server.ts

import { getPlayersByCompare } from '$lib/server/sql/dbIndex'; // Adjust the path as needed
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { PlayerId } from '$lib/server/sql/dbTypes'; // Adjust the path as needed

export const load: PageServerLoad = async ({ url, setHeaders }) => {
  // Extract the 'players' query parameter, expected to be a comma-separated list of player identifiers
  // For example: /compare?players=1,john-doe,2,jane-smith

  const playersParam = url.searchParams.get('players');

  if (!playersParam) {
    throw error(400, 'No players specified for comparison.');
  }

  // Parse the 'players' parameter into an array
  // Assuming the format is alternating Name_ID and playerNameHyphen
  // Example: '1,john-doe,2,jane-smith'
  const playerParams = playersParam.split(',');

  if (playerParams.length % 2 !== 0) {
    throw error(400, 'Invalid players parameter format.');
  }

  // Separate Name_IDs and playerNameHyphens
  const name_ids: number[] = [];
  const playerNames: string[] = [];

  for (let i = 0; i < playerParams.length; i += 2) {
    const nameId = parseInt(playerParams[i]);
    const playerName = playerParams[i + 1];

    if (isNaN(nameId) || !playerName) {
      throw error(400, 'Invalid player data.');
    }

    name_ids.push(nameId);
    playerNames.push(playerName);
  }

  // Fetch player data using getPlayersByCompare
  const players: PlayerId[] | null = getPlayersByCompare(name_ids, playerNames);

  if (!players || players.length === 0) {
    // Log the error for debugging purposes
    console.error(`No players found for the provided identifiers: ${playersParam}`);
    throw error(404, 'No players found for comparison.');
  }

  // Set Cache-Control header (e.g., cache for 10 minutes)
  setHeaders({
    'Cache-Control': 'public, max-age=600'
  });

  return {
    players
  };
};
