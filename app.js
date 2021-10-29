const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser =require('body-parser');
const cookie = require('cookie-parser');
const adminRoutes = require('./routes/admin');
const AuthRoutes = require('./routes/auth');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.text({ type: 'text/html' }))
const MONGODB_URI = 'mongodb+srv://uman:uman@authorization.vzbto.mongodb.net/Authorization';
app.use(morgan('dev'));
app.use(cookie());
app.use(adminRoutes);
app.use(AuthRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });