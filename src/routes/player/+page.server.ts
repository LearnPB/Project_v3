import { getPlayersByCompare } from "$lib/server/sql/dbIndex";
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";


type RouteParams = {
  nameId: string;
  playerName: string;
};
