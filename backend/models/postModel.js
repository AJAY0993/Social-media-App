const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'A Post must have a userId'],
    },
    content: {
      type: String,
      required: [true, 'A post must have some content'],
    },
    caption: {
      type: String,
      required: [true, 'A post have a caption'],
    },
    tags: [String],
    imageUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: true,
    toObject: true,
  }
);

const Post = mongoose.model('post', schema);
module.exports = Post;
