const express = require('express');
const converstaionController = require('../contollers/conversationController');
const authController = require('../contollers/authController');

const Router = express.Router();

Router.route('/')
  .get(authController.isAuthenticated, converstaionController.getConversations)
  .post(
    authController.isAuthenticated,
    converstaionController.createConversation
  );

Router.route('/my').get(
  authController.isAuthenticated,
  converstaionController.getUserConversations
);

Router.route('/to').get(
  authController.isAuthenticated,
  converstaionController.getUserConversation
);

module.exports = Router;
