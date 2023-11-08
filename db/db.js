import mysql from "mysql2";

export const PoolDB = () => {
  const pool = mysql
    .createPool({
      host: "sql10.freemysqlhosting.net",
      user: "sql10660099",
      password: "VIYSGyKZFP",
      database: "sql10660099",
    })
    .promise();
  return pool;
};
