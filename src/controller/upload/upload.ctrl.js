const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
}).single("image");
module.exports = {
  initUploadImage: (req, res) => {
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.json({
          error: true,
          message: "Lỗi trong quá trình tải lên, vui lòng thử lại sau!"
        });
      } else if (err) {
        return res.json({
          error: true,
          message: "Lỗi Server không xử lý được!"
        });
      }
      const processedFile = req.file || {};
      console.log('processedFile: ', processedFile)
    });
  }
};
