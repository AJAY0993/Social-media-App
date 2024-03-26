const Router = require('express').Router({ mergeParams: true });
const commentRouter = require('./commentRoutes');
const postController = require('../contollers/postController');
const authController = require('../contollers/authController');
const upload = require('../middlewares/multer');

Router.use(authController.isAuthenticated);

Router.route('/')
  .get(postController.getAllPosts)
  .post(upload.single('image'), postController.createPost);

Router.route('/:id')
  .get(postController.getPost)
  .delete(postController.deletePost);

Router.route('/:postId/like').patch(postController.likePost);

Router.use('/:postId/comments', commentRouter);

module.exports = Router;
