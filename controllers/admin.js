const User = require('../models/User');
const multer = require('multer');
const fileUpload = require('../middleware/upload-middleware');
const error = require('../middleware/error');
exports.postUpdateUser = (req, res, next) => {
  try {
    const { email, name } = req.body;

    User.findOne({ email: email })
      .then((user) => {
        user.email = email;
        user.name = name;
        return user
          .save()
          .then((result) => {
            res.status(200).json({ msg: 'Updated user', result });
          })
          .catch((err) => {
            return res.status(500).json({ msg: 'Not Update', err });
          });
      })
      .catch((error) => {
        return error.errorResponse(res, 'Error in Updated', 404, false);
      });
  } catch (error) {
    return res.status(500).json({ msg: 'Error Updated', error });
  }
};
exports.updateUserById = (req, res, next) => {
  const { userid } = req.params;
  const { email, name } = req.body;
  User.findById(userid)
    .then((user) => {
      user.email = email;
      user.name = name;
      return user
        .save()
        .then((result) => {
          res.status(200).json({ msg: 'Updated user', result });
        })
        .catch((err) => {
          error.errorResponse(res, 'Not Updated', 500, false);
        });
    })
    .catch((error) => {
      error.errorResponse(res, 'Error in update', 500, false);
    });
};
exports.getAllUser = (req, res, next) => {
  // User.find({}, (err, result) => {
  //   if (err) {
  //     return res.status(500).json({ msg: 'Did not get the users', err });
  //   }
  //   return res.status(200).json({ msg: 'User', result });
  // });
};
exports.DeleteUser = (req, res, next) => {
  const { email } = req.body;
  User.findOneAndDelete({ email: email }, (err, result) => {
    if (err) {
      return error.errorResponse(res, 'Error in deletion', 404, false);
    }
    return res.status(200).json({ msg: 'User Deleted', result });
  });
};
exports.getUpdateUser = (req, res, next) => {
  console.log('get Dashboard');
};
exports.imageUpload = (req, res, next) => {
  var upload = multer({
    storage: fileUpload.files.storage(),
    allowedFile: fileUpload.files.allowedFile,
  }).single('file');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return error.errorResponse(res, 'Error in uploading', 500, false);
    } else if (err) {
      return error.errorResponse(res, 'Error in Uploading', 502, false);
    } else {
      return res.status(200).json({ msg: 'File Uploaded' });
    }
  });
};
exports.download = async (url, dest) => {
  /* Create an empty file where we can save data */
  const file = fs.createWriteStream(dest);

  /* Using Promises so that we can use the ASYNC AWAIT syntax */
  await new Promise((resolve, reject) => {
    request({
      /* Here you should specify the exact link to the file you are trying to download */
      uri: './uploads',
      gzip: true,
    })
      .pipe(file)
      .on('finish', async () => {
        console.log(`The file is finished downloading.`);
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  }).catch((error) => {
    console.log(`Something happened: ${error}`);
  });
};
