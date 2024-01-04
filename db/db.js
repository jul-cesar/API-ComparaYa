import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

export const PoolDB = () => {
  const pool = new Pool({
    connectionString:
      "postgres://default:W3Ui9sSnbkwH@ep-billowing-glade-39781605-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb" +
      "?sslmode=require",
  });

  return pool;
};
