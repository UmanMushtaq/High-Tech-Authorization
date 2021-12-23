require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const multer = require('multer');
const error = require('../middleware/error');
const fileUpload = require('../middleware/upload-middleware');
const maxAge = 30 * 60 * 60;
exports.postLogin = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err);
    return res.status(500).json({ msg: 'Info is not valid', err });
  }

  User.findOne({ email: email })
    .then((user) => {
      const users = user;
      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          const token = createTokens(users._id);
          console.log(token);
          res.header('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          return res
            .status(200)
            .json({ msg: 'Email and password is valid', matched });
        })
        .catch((err) => {
          return res.status(500).json({ msg: 'Password is not valid', err });
        });
    })
    .catch((err) => {
      return res.status(500).json({ msg: 'Email is not valid', err });
    });
};

const createTokens = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};
exports.getLogin = (req, res, next) => {};
exports.getSignup = (req, res, next) => {};
exports.logOut = (req, res, next) => {
  res.header('jwt', '', { maxAge: 1 });
  return res.status(200).json({ msg: 'Logout' });
};
exports.postSignup = (req, res, next) => {
  const { email, name, password, file } = req.body;
  const err = validationResult(req);
  const host = req.hostname;
  const filePath = req.protocol + '://' + host + ':3000/' + req.file.path;
  if (!err.isEmpty()) {
    return res.status(500).json({ msg: 'Info is not valid', err });
  }
  bcrypt
    .hash(password, 10)
    .then((hashpassword) => {
      const user = new User({
        email: email,
        password: hashpassword,
        name: name,
        url: filePath,
      });

      return user.save();
    })
    .then((user_created) => {
      const token = createTokens(user_created._id);
      res.header('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.status(200).json({ user: user_created._id });
    })
    .catch((error) => {
      console.log(error);
    });
};
