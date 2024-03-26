const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../configs/cloudinary');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const sendResponse = require('../utils/sendResponse');
const { deleteOne } = require('./factory');

const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    message: 'Posts fetched successfully',
    data: { posts },
  });
});

const createPost = catchAsync(async (req, res, next) => {
  let result;

  if (req.file) {
    try {
      result = await cloudinary.uploader.upload(req.file.path);
    } catch (error) {
      return next(new AppError('Something went wrong in creating post', 500));
    }
  }
  const originalCreator = {
    username: req.user.username,
    profilePic: req.user.profilePic,
  };

  const post = {
    user: req.user.id,
    originalCreator,
    content: req.body.content,
    caption: req.body.caption || 'some caption',
    imageUrl: result?.secure_url,
    videoUrl: req.body.videoUrl,
    tags: req.body.tags,
  };

  const newPost = await Post.create(post);

  res.status(201).json({
    data: {
      status: 'success',
      message: 'Post created sucessfully',
      data: { newPost },
    },
  });
});

const getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    post.comments = await Comment.find({ postId: post._id });
  }
  res.status(200).json({
    status: 'success',
    message: 'Post fetched Successfully',
    data: {
      post,
    },
  });
});

const likePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  if (req.user.likedPosts.includes(postId)) {
    const postPromise = Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });
    const userPromise = User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { likedPosts: postId },
      },
      { new: true, upsert: true }
    );
    const [post, user] = await Promise.all([postPromise, userPromise]);
    sendResponse(res, 200, 'Liked successfully', {
      likedPosts: user.likedPosts,
      postLikes: post.likes,
      liked: false,
    });
  } else {
    const postPromise = Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

    const userPromise = User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { likedPosts: postId },
      },
      { new: true, upsert: true }
    );
    const [post, user] = await Promise.all([postPromise, userPromise]);
    sendResponse(res, 200, 'DisLiked successfully', {
      likedPosts: user.likedPosts,
      postLikes: post.likes,
      liked: true,
    });
  }
});

const deletePost = deleteOne(Post, true);

module.exports = { getAllPosts, getPost, createPost, likePost, deletePost };
