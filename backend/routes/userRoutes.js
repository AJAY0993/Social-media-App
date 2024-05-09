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

Router.use(authController.isAuthenticated);

Router.route('/myProfile')
  .get((req, res, next) => {
    req.params.id = req.user.id;
    next();
  }, userController.getProfile)
  .patch(
    upload.single('profilePic'),
    filterUnnecessaryFieldsAndAddImage,
    userController.updateMe
  );

Router.route('/').get(userController.getAllUsers);

Router.route('/:id').get(userController.getProfile);

Router.route('/myProfile/bookmarks').get(userController.getBookmarks);

Router.route('/myProfile/bookmarks/:postId')
  .patch(userController.addToBookmarks)
  .delete(userController.removeFromBookmarks);

Router.route('/follow/:followId').patch(userController.follow);

Router.route('/unFollow/:unFollowId').delete(userController.unFollow);

Router.route('/:userId/followers').get(userController.getFollowers);

module.exports = Router;
