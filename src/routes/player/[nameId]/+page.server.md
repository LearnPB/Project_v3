
// src\routes\player\[player]\+page.server.ts

import { getPlayerById } from "$lib/server/sql/dbIndex";
import type { PageServerLoad } from "./$types";
import { error } from '@sveltejs/kit';



type RouteParams = {
  nameId: string;
  playerName: string;
};

export const load: PageServerLoad = function ({ params, url }) {
  const nameId = parseInt(params.nameId);

  // Extracting player name from the URL pathname
  const pathnameSegments = url.pathname.split('/');
  const playerName = decodeURIComponent(pathnameSegments[pathnameSegments.length - 1]);

  // console.log(params);
  console.log(playerName);

  // Retrieve player information based on the nameId and playerName
  const player = getPlayerById(nameId, playerName);

  if (!player) {
    // Log the error for debugging purposes
    console.error(`Player not found with ID: ${nameId} and Name: ${playerName}`);
    throw error(404, `Player with ID "${nameId}" and Name "${playerName}" Not Found`);
  }

  return {
    player
  };
};
// export const load: PageServerLoad = function ({ params }) {
//   // Replace hyphens with spaces and convert to lower case for case-insensitive matching
//   const playerName = params.player.replace(/-/g, " ").toLowerCase();

//   // Find the player with case-insensitive comparison
//   const playerFul = topPlayer().find(
//     (player) => player.playerName.toLowerCase() === playerName
//   );

//   if (!playerFul) {
//     // Log the error for debugging purposes
//     console.error(`Player not found: ${params.player}`);
//     throw error(404, `Player "${params.player}" Not Found`);
//   }
//   return {
//     playerFul
//   };
// } satisfies PageServerLoad;