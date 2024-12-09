import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
dotenv.config();

//Khai báo express và cổng port
const app = express();
const port = process.env.PORT || 3000;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
const pgSession = connectPgSimple(session);

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

//Setup các middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //origin: "http://localhost:5173" là domain của frontend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    store: new pgSession({
      pool: db, // Use existing database connection pool
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Change to false to avoid creating sessions for unauthenticated users
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
      secure: false, // Để `false` khi phát triển local (hoặc true nếu sử dụng HTTPS)
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Serialize và deserialize user
passport.serializeUser((user, done) => {
  console.log("Serialized user ID:", user.userid); // Debugging log
  done(null, user.userid); // Lưu user.userid vào session
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM Users WHERE userid = $1", [id]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log("Deserialized user:", user); // Debugging log
      done(null, user); // Trả về đối tượng user đầy đủ
    } else {
      console.log("User not found during deserialization"); // Debugging log
      done(null, false); // Không tìm thấy user
    }
  } catch (err) {
    console.log("Error in deserialization:", err); // Debugging log
    done(err, null);
  }
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
        return done(null, false, { message: "User not found" });
      }
      //Nếu tồn tại thì kiểm tra password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        console.log("Password incorrect"); // Debugging log
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      console.log("Error logging in user:", err);
      return done(err);
    }
  })
);

//API đăng ký, tạo tài khoản
app.post("/api/register", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  try {
    //Kiểm tra xem email hoặc username đã tồn tại chưa
    const checkResult = await db.query("SELECT * FROM Users WHERE email = $1 OR username = $2", [email, username]);
    if (checkResult.rows.length > 0) {
      console.log("Email or username already exists"); // Debugging log
      return res.json({ success: false, error: "Email or username already exists" });
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
          return res.json({ success: false, error: "Error logging in user" });
        } else {
          return res.json({ success: true });
        }
      });
    }
  } catch (err) {
    console.log("Error registering user:", err);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//API đăng nhập
app.post("/api/login", async (req, res, next) => {
  console.log("Received login request:", req.body); // Debugging log
  passport.authenticate("local", (err, user, info) => {
    /*
    Tham số info là tham số thứ 3 trả về từ hàm done() -> chứa thông tin về lỗi 
    (vd: done(null, false, { message: "Incorrect password" })) -> info là object { message: "Incorrect password" }
    */
    if (err) {
      console.log("Error logging in user:", err); // Debugging log
      return res.json({ success: false, error: "Error logging in user" });
    } else if (!user) {
      //Vì có 2 trường hợp (!user): 1) user không tồn tại, 2) password không đúng -> localStrategy sẽ kiểm tra 2 trường hợp này và trả về info.message tương ứng
      //=> Cần phải sử dụng info.message để xác định lỗi thay vì dùng một chuỗi hằng số như các trường hợp khác.
      console.log(info.message); // Debugging log
      return res.json({ success: false, error: info.message });
    } else {
      req.login(user, (err) => {
        if (err) {
          console.log("Error logging in user:", err); // Debugging log
          return res.json({ success: false, error: "Error logging in user" });
        } else {
          console.log("User logged in successfully:", user); // Debugging log
          return res.json({ success: true, user });
        }
      });
    }
  })(req, res, next);
});

//API lấy dữ liệu posts từ database
app.get("/api/posts", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT Posts.*, Users.* 
      FROM Posts
      JOIN Users ON Posts.AuthorID = Users.UserID`
    );
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//API kiểm tra xem user đã đăng nhập chưa
app.get("/api/check-auth", (req, res) => {
  console.log("Session data:", req.session); // Kiểm tra session
  console.log("User data:", req.user); // Kiểm tra user
  try {
    if (req.isAuthenticated()) {
      res.json({ isAuthenticated: true, user: req.user });
    } else {
      res.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.log("Error checking authentication:", error);
    res.status(500).json({ isAuthenticated: false, error: "Internal Server Error" });
  }
});

// API đăng xuất
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
        return res.status(500).send("Error destroying session");
      }
      // Xóa session cookie
      res.clearCookie("connect.sid", { path: "/", domain: "localhost" });
      console.log("Session destroyed successfully");
      return res.json({ success: true });
    });
  });
});

//chạy server
app.listen(port, () => {
  console.log("Server is listening on port 3000");
});
