const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const adminRoutes = require('./routes/admin');
const AuthRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
const http = require('http').createServer(app);
require('express-async-errors');
const PORT = (process.env.PORT || 3000); 
const Comments = require('./models/Comments');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.text({ type: 'text/html' }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));
app.use(adminRoutes);
app.use(AuthRoutes);
app.use(feedRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    http.listen(PORT, 'localhost');
    const io = require('socket.io')(http);
    io.on('connection', function (socket) {
      socket.on('comment', function (data) {
        if (data.comment == true) {
          io.emit('typing');
        } else {
          io.emit('');
        }
        var commentData = new Comments(data);
        commentData.save();
        socket.broadcast.emit('comment', data);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
