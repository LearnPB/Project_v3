import { topPlayer } from "$lib/server/sql/dbIndex";

import type { PageServerLoad } from "./$types";

const loadFunction = (() => {
  const players = topPlayer();
  // console.log(players);
  return {
    players
  };
}) satisfies PageServerLoad;

export { loadFunction as load };
