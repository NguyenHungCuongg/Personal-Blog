import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
dotenv.config();

//Khai báo express và cổng port
const app = express();
const port = process.env.PORT || 3000;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;

//Setup các middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Kết nối với database
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

//API đăng ký, tạo tài khoản
app.post("/register", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  try {
    //Kiểm tra xem email hoặc username đã tồn tại chưa
    const checkResult = await db.query("SELECT * FROM Users WHERE email = $1 OR username = $2", [email, username]);
    if (checkResult.rows.length > 0) {
      return res.status(400).send("Email or username already exists");
    }
    //Nếu chưa tồn tại thì tiền hành xác thực và thêm vào database
    else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Chèn thông tin user vào database
      const insertResult = await db.query(
        "INSERT INTO Users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
        [email, username, hashedPassword]
      );

      // Lấy thông tin user vừa đăng ký
      const user = insertResult.rows[0];
      req.login(user, (err) => {
        if (err) {
          console.log("Error logging in user:", err);
          return res.status(500).send("Error logging in user");
        } else {
          return res.json({ success: true });
        }
      });
    }
  } catch (err) {
    console.log("Error registering user:", err);
    return res.status(500).send("Error registering user");
  }
});

//API đăng nhập
app.post("/login", async (req, res, next) => {
  console.log("Received login request:", req.body); // Debugging log
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("Error logging in user:", err); // Debugging log
      return res.status(400).send("Error logging in user");
    } else if (!user) {
      console.log("User not found"); // Debugging log
      return res.status(400).send("User not found");
    } else {
      req.login(user, (err) => {
        if (err) {
          console.log("Error logging in user:", err); // Debugging log
          return res.status(400).send("Error logging in user");
        } else {
          return res.json({ success: true });
        }
      });
    }
  })(req, res, next);
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      //Kiểm tra xem email hoặc username đã tồn tại chưa
      const result = await db.query("SELECT * FROM Users WHERE email = $1", [email]);
      const user = result.rows[0];
      //Nếu không tồn tại thì trả về thông báo
      if (!user) {
        console.log("User not found"); // Debugging log
        return done(null, false);
      }
      //Nếu tồn tại thì kiểm tra password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        console.log("Password incorrect"); // Debugging log
        return done(null, false);
      }
    } catch (err) {
      console.log("Error logging in user:", err);
      return done(err);
    }
  })
);

//Serialize và deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//API lấy dữ liệu posts từ database
app.get("/api/posts", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT Posts.*, Users.* 
      FROM Posts
      JOIN Users ON Posts.UserID = Users.UserID`
    );
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//API kiểm tra xem user đã đăng nhập chưa
app.get("/api/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

//chạy server
app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
