import Database from 'better-sqlite3';
import { TOP_PLAYERS_PAY, SEARCH_PLAYER_NAME, SQL_PLAYERIDNAME, SQL_PLAYER, BASE_SQL_COMPARE_PLAYERS } from './dbSql';
import type { Player, PlayerId } from './dbTypes';
import { DB_PATH } from '$env/static/private';


const db = new Database(DB_PATH, { verbose: console.log });

//...... To check if function is working ........

const lognow = await topPlayer(3)
console.log(lognow)

// Export a function named 'topPlayer' with a default parameter 'LIMIT' set to 10
export function topPlayer(LIMIT = 15): Player[] {

  // Initialize 'sql' with the SQL query to be executed
  const sql = TOP_PLAYERS_PAY; // Using ? as a placeholder for LIMIT value to avoid SQL injection

  // Prepare the SQL statement using 'db.prepare' to avoid SQL injection
  const stmt = db.prepare(sql);

  // Execute the prepared statement with 'LIMIT' as a parameter, passed as an array element to prevent SQL injection
  const rows = stmt.all([LIMIT]);

  // Return the result of the query cast as an array of 'Player' objects
  return rows as Player[];
}

export function searchPlayer(match: string, limit: number = 5): Player[] {
  const searchTerm = match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // Check if search term length is less than 3
  if (searchTerm.length < 3) {
    return []; // Return empty array if less than 3 characters
  }

  const sql = SEARCH_PLAYER_NAME;
  const stmt = db.prepare(sql);
  const rows = stmt.all({ searchTerm, limit });
  console.log(rows);
  return rows as Player[];
}

export function getPlayerByIdName(name_id: number, playerName: string): PlayerId | null {
  const sql = SQL_PLAYERIDNAME;

  // Assuming `db` is an instance of your database connection
  const stmt = db.prepare(sql);

  // Use an array to pass the parameters for the `?` placeholders
  const row = stmt.get([name_id, playerName]);

  return row as PlayerId | null;
}


export function getPlayer(name_id: number): Player | null {
  const sql = SQL_PLAYER;
  const stmt = db.prepare(sql);
  const row = stmt.get([name_id]);
  return row as Player | null;
}

