import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// DATABASE_URL comes from .env locally, or from your host's
// environment variables once deployed (Render, Railway, Neon, etc).
// Example: postgres://postgres:postgres@localhost:5432/prime_meridian
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? false
    : { rejectUnauthorized: false }, // most hosted Postgres providers require SSL
});
