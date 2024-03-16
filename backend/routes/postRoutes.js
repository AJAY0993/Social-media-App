const Router = require('express').Router({ mergeParams: true });
const commentRouter = require('./commentRoutes');
const postController = require('../contollers/postController');
const authController = require('../contollers/authController');
const upload = require('../middlewares/multer');

Router.route('/')
  .get(postController.getAllPosts)
  .post(
    authController.isAuthenticated,
    upload.single('image'),
    postController.createPost
  );

Router.route('/:postId').get(postController.getPost);

Router.route('/:postId/like').patch(
  authController.isAuthenticated,
  postController.likePost
);

Router.use('/:postId/comments', commentRouter);

module.exports = Router;
