const mongoose = require('mongoose');
const Message = require('./messageModel');

const senderRecieverSchema = new mongoose.Schema({
  username: String,
  profilePic: String,
});

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],

    reciever: senderRecieverSchema,

    sender: senderRecieverSchema,
  },
  { timsestamp: true }
);

ConversationSchema.post('findOne', async function () {
  this.messages = await Message.find({
    conversationId: this._id,
  });
});

const Conversation = mongoose.model('conversation', ConversationSchema);

module.exports = Conversation;
