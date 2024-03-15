const express = require('express');
const messageController = require('../contollers/messageController');
const authController = require('../contollers/authController');

const Router = express.Router();

Router.route('/').post(
  authController.isAuthenticated,
  messageController.createMessage
);

module.exports = Router;
