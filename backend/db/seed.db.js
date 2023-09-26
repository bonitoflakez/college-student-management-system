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

    const insertDataScript = await fs.readFile(
      path.join(__dirname, "./schema/002_seed_samples.sql"),
      "utf8"
    );

    await pool.query(insertDataScript);

    console.log("[+] Database seeded.");
    pool.end();
  } catch (err) {
    console.error("[!] Error while seeding:", err);
  }
}

main();
