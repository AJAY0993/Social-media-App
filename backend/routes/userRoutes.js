const Router = require('express').Router({ mergeParams: true });
const authController = require('../contollers/authController');
const userController = require('../contollers/userController');
const conversationRouter = require('./conversationRoutes');
const upload = require('../middlewares/multer');

const filterUnnecessaryFieldsAndAddImage = require('../middlewares/validateFields');

Router.use('/my/conversations', conversationRouter);
Router.route('/signup').post(authController.signUp);
Router.route('/login').post(authController.login);
Router.route('/forgotPassword').post(authController.forgotPassword);
Router.route('/resetPassword/:token').post(authController.resetPassword);

Router.route('/myProfile')
  .get(
    authController.isAuthenticated,
    (req, res, next) => {
      req.params.userId = req.user.id;
      next();
    },
    userController.getProfile
  )
  .patch(
    authController.isAuthenticated,
    upload.single('profilePic'),
    filterUnnecessaryFieldsAndAddImage,
    userController.updateMe
  );

Router.route('/').get(
  authController.isAuthenticated,
  userController.getAllUsers
);

Router.route('/:userId').get(
  authController.isAuthenticated,
  userController.getProfile
);

Router.route('/myProfile/bookmarks').get(
  authController.isAuthenticated,
  userController.getBookmarks
);

Router.route('/myProfile/bookmarks/:postId')
  .patch(authController.isAuthenticated, userController.addToBookmarks)
  .delete(authController.isAuthenticated, userController.removeFromBookmarks);

Router.route('/follow/:followId').patch(
  authController.isAuthenticated,
  userController.follow
);

Router.route('/unFollow/:unFollowId').delete(
  authController.isAuthenticated,
  userController.unFollow
);

Router.route('/:userId/followers').get(
  authController.isAuthenticated,
  userController.getFollowers
);

module.exports = Router;
