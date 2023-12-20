import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

// Rest of your code using Pool

export const PoolDB = () => {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  });

  return pool;
};
