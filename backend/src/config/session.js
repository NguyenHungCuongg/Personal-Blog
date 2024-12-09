import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import db from "./database";

const pgSession = connectPgSimple(session);

const sessionMiddleware = session({
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
});

export default sessionMiddleware;
