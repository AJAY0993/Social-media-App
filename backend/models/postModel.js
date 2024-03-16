const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  username: String,
  profilePic: String,
});

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A Post must have a user'],
    },
    originalCreator: creatorSchema,
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
    likes: { type: Number, default: 0 },
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

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
