import mysql from "mysql2";

export const PoolDB = () => {
  const pool = mysql
    .createPool({
      host: "sql10.freesqldatabase.com",
      user: "sql10662344",
      password: "dJx83BFDcI",
      database: "sql10662344",
    })
    .promise();
  return pool;
};
