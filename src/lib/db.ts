import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "",
  user: process.env.DB_USER ?? "",
  password: process.env.DB_PASSWORD ?? "",
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
  queueLimit: 0,
  port: Number(process.env.DB_PORT ?? 3306),
});

export default pool;