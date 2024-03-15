const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../configs/cloudinary');
const AppError = require('../utils/appError');

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

  const post = {
    userId: req.user.id,
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
  const post = await Post.findById(req.params.postId);
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

module.exports = { getAllPosts, getPost, createPost };
