import express from "express";
import db from "../config/database.js";
import authMiddleware from "../middleware/authMiddleware.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    // Lấy banner image URL của post
    const postResult = await db.query("SELECT BannerImageURL FROM Posts WHERE PostID = $1", [postID]);
    const bannerImageURL = postResult.rows[0]?.bannerimageurl;
    // Xóa các tag của post trước (vì các ràng buộc khóa ngoại)
    await db.query("DELETE FROM TagsOfPost WHERE PostID = $1", [postID]);
    // Xóa post sau khi đã loại bỏ các ràng buộc khóa ngoại
    const result = await db.query(`DELETE FROM Posts WHERE PostID= $1`, [postID]);
    if (result.rowCount === 0) {
      res.send({ success: false, message: "Post not found" });
    } else {
      if (bannerImageURL) {
        const bannerImagePath = path.join(__dirname, "../uploads/", path.basename(bannerImageURL));
        fs.unlink(bannerImagePath, (err) => {
          if (err) {
            console.log("Error deleting banner image:", err);
          } else {
            console.log("Banner image deleted successfully");
          }
        });
      }
      res.send({ success: true, message: "Post deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Internal Server Error" });
  }
});

export default router;
