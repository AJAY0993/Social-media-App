const mongoose = require('mongoose');
const Message = require('./messageModel');

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  { timsestamp: true }
);

ConversationSchema.post('findOne', async function () {
  this.messages = await Message.find({
    conversationId: this._id,
  });
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
