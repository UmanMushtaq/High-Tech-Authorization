const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentsSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  postid: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});
module.exports = mongoose.model('Comments', commentsSchema);
