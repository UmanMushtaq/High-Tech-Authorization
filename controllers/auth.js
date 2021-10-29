require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const express= require('express');
const app = express();
app.use(express.json());
const {validationResult} = require('express-validator');
const maxAge = 30*60*60;
exports.postLogin = (req,res,next)=>{
    const {email} = req.body;
    const {password} = req.body;
    const err = validationResult(req);
    if (!err.isEmpty()){
        return res.status(422).json({ msg: 'Info is not  valid',err });
    }
    User.findOne({email:email})
    .then(user=>{
        const users = user;
        bcrypt.compare(password,user.password)
        .then(matched=>{
            const token = createTokens(users._id);
            console.log(token);
            res.header('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
            return res.status(200).json({ msg: 'Email and password is valid',matched });
            
        })
        .catch(err=>{
            return res.status(422).json({ msg: 'Password is not  valid',err });
        })
    })
    .catch(err=>{
        return res.status(422).json({ msg: 'Email is not  valid',err });
    })
}

const createTokens = (id) =>{
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: maxAge
    })
}
exports.getLogin = (req,res,next)=>{

}
exports.getSignup = (req,res,next)=>{
    
}
exports.logOut = (req,res,next)=>{
    res.cookie('jwt','',{maxAge:1});
    return res.status(200).json({ msg: 'Logout' });
}
exports.postSignup = (req,res,next)=>{
    const {email} = req.body;
    const {password} = req.body;
    const {name} = req.body;
    const err = validationResult(req);
    console.log(err);
    if(!err.isEmpty())
    {
        return res.status(422).json({ msg: 'Info is not  valid',err });
    }
    bcrypt.hash(password,10)
    .then(hashpassword=>{
        const user = new User({
            email: email,
            password:hashpassword,
            name:name
        });
        
        return user.save();
    })
    .then(user_created=>{
        const token = createTokens(user_created._id);
        res.header('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        return res.status(200).json({ user:user_created._id });
    })
    .catch(error=>{
        console.log(error);
    })
       

}
