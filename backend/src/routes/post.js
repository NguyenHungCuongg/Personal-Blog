import express from "express";
import db from "../config/database.js";

const router = express.Router();

//API lấy dữ liệu posts từ database
router.get("/posts", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT Posts.*, Users.*,  array_agg(Tags.TagName) as topics
      FROM Posts
      JOIN Users ON Posts.AuthorID = Users.UserID
      JOIN TagsOfPost ON Posts.PostID = TagsOfPost.PostID
      JOIN Tags ON TagsOfPost.TagID = Tags.TagID
      GROUP BY Posts.PostID, Users.UserID` //Truy cập mảng wtopics thông qua array_agg với mỗi post.
    );
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//API lấy dữ liệu post từ database theo postID
router.get("/posts/:postId", async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT Posts.*, Users.*, array_agg(Tags.TagName) as topics
      FROM Posts
      JOIN Users ON Posts.AuthorID = Users.UserID
      JOIN TagsOfPost ON Posts.PostID = TagsOfPost.PostID
      JOIN Tags ON TagsOfPost.TagID = Tags.TagID
      WHERE Posts.PostId = $1
      GROUP BY Posts.PostID, Users.UserID
      `,
      [req.params.postId] //req.params.postID lấy postID từ URL ("/posts/:postID")
    );
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/posts", async (req, res) => {
  const title = req.body.title;
  const topics = req.body.topics;
  const bannerImageUrl = req.body.bannerImageUrl;
  console.log("Gia tri cua bannerImageUrl trong API" + bannerImageUrl);
  const content = req.body.content;
  const authorID = req.body.user.userid;
  try {
    const postResult = await db.query(
      `INSERT INTO Posts (Title, Content, AuthorID, BannerImageURL) VALUES ($1, $2, $3, $4) RETURNING PostID`,
      [title, content, authorID, bannerImageUrl]
    );
    const postID = postResult.rows[0].postid;
    for (const topic of topics) {
      const tagResult = await db.query(`SELECT TagID FROM Tags WHERE TagName = $1`, [topic]);
      if (tagResult.rows.length > 0) {
        const tagID = tagResult.rows[0].tagid;
        await db.query(`INSERT INTO TagsOfPost  (PostID, TagID) VALUES ($1, $2)`, [postID, tagID]);
      } else {
        console.log(`Tag not found for topic: ${topic}`);
      }
    }
    res.json({ success: true, post: postResult.rows[0], message: "Post created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
