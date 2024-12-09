import express from "express";
import passport from "../config/passport.js";
import { saltRounds } from "../config/constants.js";

const router = express.Router();

//API đăng ký, tạo tài khoản
router.post("/register", async (req, res) => {
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
router.post("/login", async (req, res, next) => {
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
router.get("/posts", async (req, res) => {
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
router.get("/check-auth", (req, res) => {
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
router.get("/logout", (req, res) => {
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

export default router;
