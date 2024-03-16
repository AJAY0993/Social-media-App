const Comment = require('../models/commentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/sendResponse');

const addPostId = (req) => {
  if (req.params.postId) req.body.postId = req.params.postId;
};

const getPostComments = catchAsync(async (req, res, next) => {
  addPostId(req);
  if (!req.body.postId) {
    return next(new AppError(400, 'Please provide post ID'));
  }

  const comments = await Comment.find({ post: req.body.postId }).sort({
    createdAt: -1,
  });

  // .populate does not work it throws schema is not registerd error

  sendResponse(res, 200, 'comments fetched successfully', { comments });
});

const createComment = catchAsync(async (req, res, next) => {
  addPostId(req);
  if (!req.body.comment || !req.body.postId) {
    return next(new AppError(400, 'Inavlid input data'));
  }

  const newComment = await Comment.create({
    comment: req.body.comment,
    post: req.body.postId,
    user: req.user.id,
    creator: {
      username: req.user.username,
      profilePic: req.user.profilePic,
    },
  });

  sendResponse(res, 201, 'comment created successfully', {
    comment: newComment,
  });
});

const deleteComment = catchAsync(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  sendResponse(res, 204, 'comment deleted successfully');
});

module.exports = { createComment, getPostComments, deleteComment };
