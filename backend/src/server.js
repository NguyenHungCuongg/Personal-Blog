import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import sessionMiddleware from "./config/session";
import passport from "./config/passport";
import authRoutes from "./routes/auth";
dotenv.config();

//Khai báo express và cổng port
const app = express();
const port = process.env.PORT || 3000;

//Setup các middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //origin: "http://localhost:5173" là domain của frontend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", authRoutes);

//chạy server
app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
