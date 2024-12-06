import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

//Khai báo express và cổng port
const app = express();
const port = 3000;

//Setup các middleware
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

//Kết nối với database
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

//API lấy dữ liệu từ database

//chạy server
app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
