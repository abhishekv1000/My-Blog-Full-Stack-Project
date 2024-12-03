import mysql from "mysql"

export const db = mysql.createConnection({
  host:process.env.HS,
  user:process.env.RT,
  password: process.env.PASS,
  database:process.env.DBBASE
})

//databse sql on clever cloud