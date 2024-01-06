import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

export const PoolDB = () => {
  const pool = new Pool({
    connectionString: "postgres://fl0user:TatKwI1dfY6g@ep-green-flower-56028533.us-east-2.aws.neon.fl0.io:5432/comparaya?sslmode=require"
  });

  return pool;
};
