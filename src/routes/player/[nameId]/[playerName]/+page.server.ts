
// src\routes\player\[nameId]\[playerNames]\+page.server.ts

import { getPlayerByIdName } from "$lib/server/sql/dbIndex";
import type { PageServerLoad } from "./$types";
import { error } from '@sveltejs/kit';



type RouteParams = {
  nameId: string;
  playerName: string;
};

export const load: PageServerLoad = function ({ params, url, setHeaders }) {
  const nameId = parseInt(params.nameId);
  // Extracting player name from the URL pathname:
  // const pathnameSegments = url.pathname.split('/');
  // const playerName = decodeURIComponent(pathnameSegments[pathnameSegments.length - 1]);
  const playerName = params.playerName;
  // console.log(params);
  // console.log(playerName);
  // Retrieve player information based on the nameId and playerName
  const player = getPlayerByIdName(nameId, playerName);



  if (player && !player.Imageurl) {
    player.Imageurl = '/path/to/default/image.jpg'; // Update with your default image path
  }

  if (!player) {
    // Log the error for debugging purposes
    console.error(`Player not found with ID: ${nameId} and Name: ${playerName}`);
    throw error(404, `Player with ID "${nameId}" and Name "${playerName}" Not Found`);
  }
  // Set Cache-Control header
  setHeaders({
    'Cache-Control': 'Cache-Control' // Cache for 10 mnt
  });

  return {
    player
  };
};
