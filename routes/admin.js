const express = require('express');
const authValidate = require('../middleware/authmiddleware');
const router = express.Router();
const adminController = require('../controllers/admin');
const validate = require('../Validator/validate');
router.post('/updateinfo',authValidate.IsAuth,authValidate.role,adminController.postUpdateUser);
router.get('/updateinfo',authValidate.IsAuth,authValidate.role,adminController.getUpdateUser);
router.delete('/removeuser',authValidate.IsAuth,authValidate.role,adminController.DeleteUser);
router.post('/validate',validate.data_validation);




module.exports = router;