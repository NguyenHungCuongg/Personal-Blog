import express from "express";
import multer from "multer";

const router = express.Router();

//setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); //thêm thời gian để tránh trùng tên file
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
});
