const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, 'Please provide senderId'],
    },
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
