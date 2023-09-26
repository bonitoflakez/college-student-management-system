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
    const queryPath = path.join(__dirname, "./schema/003_db_relation_test.sql");
    const sqlQueries = (await fs.readFile(queryPath, "utf8")).split(";");

    const totalTests = 5;
    const testsToFail = 3;
    const testsToPass = 2;

    let numPasses = 0;
    let numErrors = 0;

    for (const sqlQuery of sqlQueries) {
      if (sqlQuery.trim() === "") {
        continue;
      }

      try {
        await pool.query(sqlQuery);

        console.log("[+] Query executed successfully:");
        console.log(sqlQuery);
        numPasses++;
      } catch (err) {
        console.error("[!] Error executing query:");
        console.error(sqlQuery);
        console.error(err);
        numErrors++;
      }
    }

    console.log(`\n\n\n`);
    console.log(`[+] ${numPasses}/${testsToPass} queries passed`);
    console.log(`[+] ${numErrors}/${testsToFail} queries failed`);
    console.log(`[+] ${numPasses + numErrors}/${totalTests} tests passed`);
    pool.end();
  } catch (err) {
    console.error("[!] Error initializing the database:", err);
  }
}

main();
