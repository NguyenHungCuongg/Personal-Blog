import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { validateMIMEType } from "validate-image-type";

const router = express.Router();

//thư mục lưu file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDir)) {
  //nếu thư mục không tồn tại thì tạo mới
  fs.mkdirSync(uploadDir, { recursive: true });
}

//chỉnh sửa tên file cho phù hợp
const sanitizeFileName = (fileName) => {
  return fileName.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
};

//setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); //thư mục lưu file
  },
  filename: function (req, file, cb) {
    const fileName = sanitizeFileName(file.originalname);
    cb(null, `${Date.now()}_${fileName}`); //thêm thời gian để tránh trùng tên file
  },
});

const upload = multer({ storage: storage });

const asyncWrapper = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

router.post(
  "/upload",
  upload.single("image"),
  asyncWrapper(async (req, res) => {
    const validationResult = await validateMIMEType(req.file.path, {
      originalFilename: req.file.originalname,
      allowMimeTypes: ["image/jpeg", "image/gif", "image/png", "image/svg+xml"],
    });
    if (!validationResult.ok) {
      console.log("No file received"); //Sau này ta sẽ thay bằng các alert hoặc thông báo lỗi khác
      return res.status(400).send({ message: "No file uploaded" });
    }
    console.log("File received");
    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    console.log(fileUrl);
    res.send({ fileUrl });
  })
);

export default router;
