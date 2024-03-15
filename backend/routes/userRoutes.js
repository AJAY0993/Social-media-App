const Router = require('express').Router({ mergeParams: true });
const authController = require('../contollers/authController');
const userController = require('../contollers/userController');
const conversationRouter = require('./conversationRoutes');

Router.use('/my/conversations', conversationRouter);
Router.route('/signup').post(authController.signUp);
Router.route('/login').post(authController.login);
Router.route('/forgotPassword').post(authController.forgotPassword);
Router.route('/myProfile').get(
  authController.isAuthenticated,
  (req, res, next) => {
    req.params.userId = req.user.id;
    next();
  },
  userController.getProfile
);

Router.route('/').get(
  authController.isAuthenticated,
  userController.getAllUsers
);

Router.route('/:userId').get(
  authController.isAuthenticated,
  userController.getProfile
);

Router.route('/:userId').get(
  authController.isAuthenticated,
  userController.getProfile
);

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
