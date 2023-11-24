import mysql from "mysql2";

export const PoolDB = () => {
  const pool = mysql
    .createPool({
      host: "bvrrllxlnbfxvzkuxi48-mysql.services.clever-cloud.com",
      user: "uergrq19spxmymwc",
      password: "nQFNl1zx3GGSVBQKmRUj",
      database: "bvrrllxlnbfxvzkuxi48",
    })
    .promise();
  return pool;
};