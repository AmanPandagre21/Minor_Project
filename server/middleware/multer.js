const multer = require("multer");
const path = require("path");

// set storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../src/uploads/agencies"));
  },
  filename: function (req, file, cb) {
    // image.jpg
    var ext = file.originalname.substr(file.originalname.lastIndexOf("."));

    cb(null, file.fieldname + "-" + Date.now() + ext);
  },

  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf)$/)) {
      return cb(
        new Error("only upload files with jpg, jpeg, png, pdf format.")
      );
    }
    cb(undefined, true);
  },
});


module.exports = store = multer({ storage: storage });
