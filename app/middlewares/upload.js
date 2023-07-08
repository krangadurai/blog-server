const multer = require("multer");
const maxSize =  10* 1024 * 1024;
const path = require("path");
const __basedir = path.resolve(path.dirname(""));
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Append unique value to the original filename
  }
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
})
module.exports = uploadFile;
