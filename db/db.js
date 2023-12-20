import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

export const PoolDB = () => {
  const pool = new Pool({
    connectionString:
      "postgres://default:O7iwJVAbKt0r@ep-damp-recipe-48184732-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb" +
      "?sslmode=require",
  });

  return pool;
};
