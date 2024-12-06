import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

//Khai báo express và cổng port
const app = express();
const port = 3000;
const saltRounds = 10;

//Setup các middleware
dotenv.config();
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
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing password:", err);
        } else {
          const insertResult = await db.query(
            "INSERT INTO Users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
            [email, username, hash]
          );
          res.status(200).send("User registered");
          //Lấy thông tin user vừa đăng ký
          const user = insertResult.rows[0];
          req.login(user, (err) => {
            if (err) {
              console.log("Error logging in user:", err);
            } else {
              res.status(200).send(user);
              res.redirect("/login");
            }
          });
        }
      });
    }
  } catch (err) {
    console.log("Error registering user:", err);
  }
});

//API đăng nhập
app.post("/login", async (req, res) => {
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
          return res.status(200).send("User logged in");
        }
      });
    }
  });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      //Kiểm tra xem email hoặc username đã tồn tại chưa
      const result = await db.query("SELECT * FROM Users WHERE email = $1", [email]);
      //Nếu tồn tại thì kiểm tra password
      if (result.rows.length > 0) {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, result) => {
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
