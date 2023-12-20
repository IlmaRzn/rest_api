import mysql from "mysql2"
import { createConnection } from "mysql2";
const connection = createConnection({
    host:'localhost',
    user:'root',
    password:'root1234',
   database:'courses',
})
connection.connect((err) => {
  if (err) throw err;
  console.log("database connected");
});


export default connection;