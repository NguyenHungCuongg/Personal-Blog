import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import sessionMiddleware from "./config/session.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import uploadRoutes from "./routes/upload.js";
import mycollection from "./routes/mycollection.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

//Khai báo express và cổng port
const app = express();
const port = process.env.PORT || 3000;

//Setup các middleware
app.use(cors({ origin: "https://personal-blog-v1.onrender.com", credentials: true })); //origin: "http://localhost:5173" là domain của frontend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Chuyển đổi import.meta.url thành __dirnam
const __filename = fileURLToPath(import.meta.url); // Đường dẫn file hiện tại
const __dirname = path.dirname(__filename); // Đường dẫn thư mục hiện tại
// Middleware phục vụ file tĩnh
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", uploadRoutes);
app.use("/api", mycollection);

//chạy server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
