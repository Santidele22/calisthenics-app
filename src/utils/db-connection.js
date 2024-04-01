import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { DB_PASSWORD, DB_NAME } = process.env;
export default async function dbconnection() {
  try {
    const config = {
      host: "localhost",
      user: "root",
      port: 3306,
      password: DB_PASSWORD,
      database: DB_NAME,
    };
    const con = await mysql.createConnection(config);
    return con;
  } catch (error) {
    throw new Error({ Error: "Failed connection ddatabase" });
  }
}
