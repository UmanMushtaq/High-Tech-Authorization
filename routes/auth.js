const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authController = require('../controllers/auth');
const {check,body,validationResult} = require('express-validator');
router.post('/login',[check('email').isEmail().trim().normalizeEmail()],authController.postLogin);
router.post('/signup',[check('email').isEmail().trim().normalizeEmail().custom((value,{req})=>{
    return User.findOne({email:value})
    .then(result =>{
        if (result){
            return Promise.reject('Already Exist');
        }
    })
})],authController.postSignup);
router.get('/login',authController.getLogin);
router.get('/signup',authController.getSignup);
router.get('/logOut',authController.logOut);

module.exports = router;