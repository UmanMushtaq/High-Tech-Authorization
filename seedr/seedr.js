const express = require('express');
const User = require('../models/User');
const mongoose = require("mongoose");
const user = new User({
    email:"umanmushtaq72@gmail.com",
    password:"uman",
    name:"uman "
})
mongoose.connect('mongodb+srv://uman:uman@authorization.vzbto.mongodb.net/Authorization').then(result=>{
console.log("db from seedr connected", result);
})
const seedUser = async () => {
    await User.create({
        email:"umanmushtaq72@gmail.com",
        password:"uman",
        name:"uman",
        role:"admin"
    })
}

seedUser();
