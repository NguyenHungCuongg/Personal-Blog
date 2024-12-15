import express from "express";
import db from "../config/database.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/mycollection/mypost", authMiddleware, async (req, res) => {
  const userID = req.user.userid;
  try {
    const result = await db.query(
      `
      SELECT * FROM Posts 
      JOIN Users ON Posts.AuthorID = Users.UserID 
      WHERE AuthorID = $1`,
      [userID]
    );
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
