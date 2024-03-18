const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide sender ID'],
  },
  reciever: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide reviever ID'],
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  message: {
    type: String,
    required: [true, 'Please provide required a message'],
  },
  conversation: {
    type: mongoose.Schema.ObjectId,
    ref: 'Conversation',
    required: [true, 'Please provide message'],
  },
});

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;
