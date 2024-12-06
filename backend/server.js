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
const saltRounds = process.env.SALT_ROUNDS || 10;

//Setup các middleware
app.use(cors());
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
      res.status(400).send("Email or username already exists");
      return;
    }
    //Nếu chưa tồn tại thì tiền hành xác thực và thêm vào database
    else {
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS || 10));

      // Chèn thông tin user vào database
      const insertResult = await db.query(
        "INSERT INTO Users (email, username, passwordhash) VALUES ($1, $2, $3) RETURNING *",
        [email, username, hashedPassword]
      );

      // Lấy thông tin user vừa đăng ký
      const user = insertResult.rows[0];
      req.login(user, (err) => {
        if (err) {
          console.log("Error logging in user:", err);
          return res.status(500).send("Error logging in user");
        } else {
          return res.redirect("/");
        }
      });
    }
  } catch (err) {
    console.log("Error registering user:", err);
  }
});

//API đăng nhập
app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(400).send("Error logging in user");
    } else if (!user) {
      return res.status(400).send("User not found");
    } else {
      req.login(user, (err) => {
        if (err) {
          return res.status(400).send("Error logging in user");
        } else {
          return res.redirect("/");
        }
      });
    }
  })(req, res, next);
});

passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "passwordhash" }, async (email, passwordhash, done) => {
    try {
      //Kiểm tra xem email hoặc username đã tồn tại chưa
      const result = await db.query("SELECT * FROM Users WHERE email = $1", [email]);
      //Nếu tồn tại thì kiểm tra password
      if (result.rows.length > 0) {
        const user = result.rows[0];
        bcrypt.compare(passwordhash, user.passwordhash, (err, result) => {
          if (err) {
            return done(err);
          } else if (result) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
        //Nếu không tồn tại thì trả về thông báo
      } else {
        res.send("User not found");
      }
    } catch (err) {
      console.log("Error logging in user:", err);
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

//API lấy dữ liệu từ database

//chạy server
app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
