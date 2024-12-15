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

router.post("/mycollection/mypost/delete/:postId", async (req, res) => {
  const postID = req.params.postId;
  try {
    // Xóa các tag của post trước (vì các ràng buộc khóa ngoại)
    await db.query("DELETE FROM TagsOfPost WHERE PostID = $1", [postID]);
    // Xóa post sau khi đã loại bỏ các ràng buộc khóa ngoại
    const result = await db.query(`DELETE FROM Posts WHERE PostID= $1`, [postID]);
    if (result.rowCount === 0) {
      res.send({ success: false, message: "Post not found" });
    } else {
      res.send({ success: true, message: "Post deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Internal Server Error" });
  }
});

export default router;
