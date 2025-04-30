import multer from "multer";

// STorage
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

// Upload
const upload = multer({
  storage: storage
});

export default upload;