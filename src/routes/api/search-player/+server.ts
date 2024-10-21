import { topPlayer, searchPlayer } from "$lib/server/sql/dbIndex";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import type { Player } from "$lib/server/sql/dbTypes";
let players: Player[] = [];


// export const GET = (({ url }) => {
//   const searchTerm = url.searchParams.get('searchTerm')?.toString();
//   let players: Player[] = [];
//   if (!searchTerm) {
//     players = topPlayer();
//   } else {
//     players = searchPlayer(searchTerm) ?? [];
//   }
//   return json(players);
// }) satisfies RequestHandler;

export const GET = (({ url }) => {
  const searchTerm = url.searchParams.get('searchTerm')?.toString();

  if (!searchTerm || searchTerm.length < 3) {
    players = topPlayer();
  }
  else {
    players = searchPlayer(searchTerm) ?? [];
  }
  return json({ players });
}) satisfies RequestHandler;




// export const GET = (({ url }) => {
//   const searchOnly = url.searchParams.get('searchTerm')?.toString();
//   let players: Player[] = [];

// export const GET: RequestHandler = async ({ url }) => {
//   const searchTerm = url.searchParams.get("searchTerm")?.toLowerCase();
//   let players: Player[] = [];

//   try {
//     if (!searchTerm) {
//       players = await topPlayer();
//     } else {
//       players = await searchPlayer(searchTerm) ?? [];
//     }
//   } catch (error) {
//     console.error("Error fetching players:", error);
//     return json({ error: "An error occurred while fetching players" }, { status: 500 });
//   }

//   return json({ players });
// };