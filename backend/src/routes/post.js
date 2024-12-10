import express from "express";
import db from "../config/database.js";

const router = express.Router();

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

router.post("/posts", async (req, res) => {
  const title = res.body.title;
  const topics = res.body.topics;
  const content = res.body.content;
  const authorID = res.body.user.UserID;
  try {
    const result = await db.query(
      `INSERT INTO Posts (Title, Topics, Content, AuthorID)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [title, topics, content, authorID]
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
