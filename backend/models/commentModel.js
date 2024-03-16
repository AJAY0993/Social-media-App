const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  username: String,
  profilePic: String,
});

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide senderId'],
    },
    creator: creatorSchema,
    comment: {
      type: String,
      required: [true, 'Please provide a comment'],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Please providepost id'],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('comment', Schema);
module.exports = Comment;
