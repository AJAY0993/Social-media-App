const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { io, userIdToSocketIdMap } = require('../configs/socket');
const catchAsync = require('../utils/catchAsync');
const sendNotification = require('../services/firebase');

const getAllMessage = catchAsync(async (req, res, next) =>
  next(new AppError(404, 'This route is not implemented yet'))
);

const createMessage = catchAsync(async (req, res, next) => {
  const senderId = req.user.id;
  const { recieverId } = req.body;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, recieverId] },
  }).select('_id');

  const reciever = await User.findById(recieverId);
  if (!reciever) return next(new AppError(400, 'Reciever does not exist'));
  if (!conversation) {
    const participants = [senderId, recieverId];
    conversation = await Conversation.create({
      participants,
      sender: { username: req.user.username, profilePic: req.user.profilePic },
      reciever: {
        username: reciever.username,
        profilePic: reciever.profilePic,
      },
    });
  }

  const message = await Message.create({
    sender: senderId,
    reciever: recieverId,
    message: req.body.message,
    conversation: conversation._id,
  });

  const notification = {
    title: `${req.user.username} sends a new message`,
    body: message.message,
    type: 'newMessage',
  };

  sendNotification([reciever.firebaseToken], notification);
  io.to(userIdToSocketIdMap[recieverId]).emit('event:message', message);
  res.status(201).json({
    status: 'success',
    data: {
      message,
    },
  });
});

const updateMessage = catchAsync(async (req, res, next) =>
  next(new AppError(404, 'This route is not implemented yet'))
);

module.exports = { createMessage, updateMessage, getAllMessage };
