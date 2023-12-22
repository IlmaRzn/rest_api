import mysql from "mysql2"
import { createConnection } from "mysql2";
import dotenv from "dotenv"
dotenv.config();

const connection = createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root1234",
  database: process.env.DB_DATABASE || "courses",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("database connected");
});


export default connection;