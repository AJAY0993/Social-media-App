const Router = require('express').Router({ mergeParams: true });
const commentController = require('../contollers/commentController');
const authController = require('../contollers/authController');

Router.route('/')
  .get(commentController.getComments)
  .post(authController.isAuthenticated, commentController.createComment);

Router.route('/:id').delete(commentController.deleteComment);

module.exports = Router;
