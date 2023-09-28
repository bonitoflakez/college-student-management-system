import { Pool } from "pg";

const databaseConfig = {
  user: Bun.env.DB_USER,
  password: Bun.env.DB_PASSWD,
  host: Bun.env.DB_HOST,
  port: Bun.env.DB_PORT,
  database: Bun.env.DB_NAME,
};

const pool = new Pool(databaseConfig);

export default pool;
