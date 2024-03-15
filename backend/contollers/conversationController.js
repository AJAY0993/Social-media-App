const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/sendResponse');

const getConversations = catchAsync(async (req, res, next) => {
  const conversations = await Conversation.find();

  return res.status(200).json({
    staus: 'success',
    data: {
      conversations,
    },
  });
});

const createConversation = catchAsync(async (req, res, next) => {
  const participant1 = req.user.id;
  const participant2 = req.body.recieverId;
  if (!participant1 || !participant2) {
    return next(new AppError(400, 'Please provide participants'));
  }
  // Check if reciver exist
  const reciever = await User.findById(participant2);

  if (!reciever) return next(new AppError(400, 'Reciever does not exist'));
  const participants = [participant1, participant2];
  const conversation = await Conversation.create({
    participants,
    sender: { username: req.user.username, profilePic: req.user.profilePic },
    reciever: { username: reciever.username, profilePic: reciever.profilePic },
  });
  return res.status(201).json({
    status: 'success',
    message: 'New conversation created successfully',
    data: {
      conversation,
    },
  });
});

const getConversation = catchAsync(async (req, res, next) => {
  const conversation = await Conversation.findOne(req.params.id);

  return res.satus(200).json({
    staus: 'success',
    data: {
      conversation,
    },
  });
});

const getUserConversations = catchAsync(async (req, res, next) => {
  const conversations = await Conversation.find({
    sender: req.user.id,
  }).populate('User');

  sendResponse(res, 200, 'conversations fetched successfully', {
    conversations,
  });
});

const getUserConversation = catchAsync(async (req, res, next) => {
  const { reciever } = req.query;
  if (!reciever) return next(new AppError(400, 'Please provide Reciever'));
  let conversation = await Conversation.findOne({
    participants: { $all: [req.user.id, reciever] },
  });
  conversation = conversation.toObject();
  const messages = await Message.find({
    conversation: conversation._id,
  });
  conversation.messages = messages;

  sendResponse(res, 200, 'Conversation fetched successfully', conversation);
});

module.exports = {
  getConversations,
  createConversation,
  getConversation,
  getUserConversations,
  getUserConversation,
};
