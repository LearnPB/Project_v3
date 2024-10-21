export const TOP_PLAYERS_PAY = `
    SELECT 
    Name_ID as nameId, name AS playerName,
      CAST(REPLACE(SUBSTRING(TotalPay, 2), ',', '') AS INTEGER) AS totalPay
    FROM 
      alldata
    ORDER BY 
    totalPay DESC
    LIMIT ?;` // Using ? as a placeholder and not '$LIMIT' or 10 is to avoid SQL injection or make dynamic

export const SQL_PLAYER = `SELECT Name_ID AS nameId,
    Name AS playerName,
    Nation AS nation
    FROM alldata
    WHERE Name_ID = ?;`; // Using ? as a placeholder for the parameter


export const SEARCH_PLAYER_NAME = `
SELECT Name_ID AS nameId,
       name AS playerName,
       CAST(REPLACE(SUBSTRING(TotalPay, 2), ',', '') AS INTEGER) AS totalPay
FROM alldata
WHERE lower(name) LIKE '%' || lower($searchTerm) || '%'
ORDER BY totalPay DESC
LIMIT $limit;
`;

export const SQL_PLAYERIDNAME = `SELECT 
    Name_ID AS nameId,
    Name AS playerName,
    (SUBSTR(Name, 1, INSTR(Name, ' ') - 1) || '-' || SUBSTR(Name, INSTR(Name, ' ') + 1)) AS playerNameHypen,
    Nation AS nation,
    TotalPay As playerPay,
    Image AS Imageurl
FROM 
    alldata
    WHERE Name_ID = ? AND LOWER (playerNameHypen) = ?;`; // Using ? as a placeholder for the parameter

// db.queries.ts

export const BASE_SQL_COMPARE_PLAYERS = `
    SELECT 
        Name_ID AS nameId,
        Name AS playerName,
        (SUBSTR(Name, 1, INSTR(Name, ' ') - 1) || '-' || SUBSTR(Name, INSTR(Name, ' ') + 1)) AS playerNameHyphen,
        Nation AS nation,
        TotalPay AS playerPay,
        Image AS Imageurl
    FROM 
        alldata
    WHERE 
        Name_ID IN ({nameIdPlaceholders}) 
        AND LOWER(playerNameHyphen) IN ({playerNamePlaceholders});
`;

