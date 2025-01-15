import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import bcrypt from "bcrypt";
import db from "./database.js";

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Kiểm tra xem user đã tồn tại chưa
        const result = await db.query("SELECT * FROM Users WHERE googleid = $1", [profile.id]);
        let user = result.rows[0];
        if (!user) {
          //Kiểm tra xem email đã tồn tại chưa
          const emailResult = await db.query("SELECT * FROM Users WHERE email = $1", [profile.emails[0].value]);
          if (emailResult.rows.length > 0) {
            return done(null, false, { message: "Email already used" });
          }
          // Nếu user chưa tồn tại, thêm user mới vào database
          const insertResult = await db.query(
            "INSERT INTO Users (googleid, email, username) VALUES ($1, $2, $3) RETURNING *",
            [profile.id, profile.emails[0].value, profile.displayName]
          );
          user = insertResult.rows[0];
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
