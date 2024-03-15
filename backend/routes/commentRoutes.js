const Router = require('express').Router({ mergeParams: true });
const commentController = require('../contollers/commentController');
const authController = require('../contollers/authController');

Router.route('/')
  .get(commentController.getPostComments)
  .post(authController.isAuthenticated, commentController.createComment);

Router.route('/:commentId').delete(commentController.deleteComment);

module.exports = Router;
