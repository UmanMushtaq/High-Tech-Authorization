var multer = require('multer');
files = {
  storage: function () {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    return storage;
  },
  allowedFile: function (req, file, cb) {
    if (
      !file.originalname.match(
        /\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/
      )
    ) {
      req.fileValidationError = 'Only  files are allowed!';
      return cb(new Error('Only  files are allowed!'), false);
    }
    cb(null, true);
  },
};
exports.imageUpload = (req, res, next) => {
  var upload = multer({
    storage: files.storage(),
    allowedFile: files.allowedFile,
  }).single('file');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ msg: 'Error in Uploading', err });
    } else if (err) {
      return res.status(500).json({ msg: 'Error in Upload', err });
    } else {
      next();
      // return res.status(200).json({ msg: 'File Uploaded' });
    }
  });
};
