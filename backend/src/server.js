import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import sessionMiddleware from "./config/session.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
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
  console.log(`Server is running on port ${port}`);
});
