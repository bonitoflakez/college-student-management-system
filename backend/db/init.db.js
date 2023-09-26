import { Pool } from "pg";
import fs from "fs/promises";
import path from "path";

async function main() {
  try {
    const databaseConfig = {
      user: Bun.env.DB_USER,
      password: Bun.env.DB_PASSWD,
      host: Bun.env.DB_HOST,
      port: Bun.env.DB_PORT,
      database: Bun.env.DB_NAME,
    };

    const pool = new Pool(databaseConfig);

    const createTablesScript = await fs.readFile(
      path.join(__dirname, "./schema/001_init_tables.sql"),
      "utf8"
    );

    await pool.query(createTablesScript);

    console.log("[+] Tables created successfully.");
    pool.end();
  } catch (err) {
    console.error("[!] Error initializing the database:", err);
  }
}

main();
