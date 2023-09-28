import { Pool } from "pg";

async function main() {
  try {
    const databaseConfig = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    };

    const pool = new Pool(databaseConfig);

    const queryResult = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
    );

    const tableNames = queryResult.rows.map((row) => row.table_name);

    if (tableNames.length === 0) {
      console.log("[+] No tables found to drop.");
      pool.end();
      return;
    }

    // Generate the DROP TABLE statement
    const dropTablesQuery = `DROP TABLE IF EXISTS ${tableNames.join(", ")};`;

    try {
      await pool.query(dropTablesQuery);
      console.log("[+] Dropped tables successfully.");
    } catch (err) {
      console.error("[!] Error dropping tables:", err.message);
    }

    pool.end();
  } catch (err) {
    console.error("[!] Error initializing the database:", err);
  }
}

main();
