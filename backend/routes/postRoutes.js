const Router = require('express').Router({ mergeParams: true });
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

module.exports = Router;
