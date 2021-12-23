const express = require('express');
const authValidate = require('../middleware/authmiddleware');
const router = express.Router();
const adminController = require('../controllers/admin');
const validate = require('../Validator/validate');
const pagination = require('../middleware/pagination');
const User = require('../models/User');
router.put(
  '/updateinfo/:userid',
  authValidate.IsAuth,
  authValidate.role,
  adminController.updateUserById
);
router.post(
  '/updateinfo/:userid',
  authValidate.IsAuth,
  authValidate.role,
  adminController.getUpdateUser
);
router.delete(
  '/removeuser',
  authValidate.IsAuth,
  authValidate.role,
  adminController.DeleteUser
);
router.post('/validate', validate.data_validation);
router.get('/alluser', pagination.pagination(User), adminController.getAllUser);
router.post('/imageuploads', adminController.imageUpload);

module.exports = router;
