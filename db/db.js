import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

export const PoolDB = () => {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
  });

  return pool;
};
