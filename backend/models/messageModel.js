const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
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
    message: {
      type: String,
      required: [true, 'Please provide required a message'],
    },
    conversation: {
      type: mongoose.Schema.ObjectId,
      ref: 'Conversation',
      required: [true, 'Please provide message'],
    },
  },
  { timestamps: true }
);

MessageSchema.pre(/^find/, function () {
  this.populate({
    path: 'sender',
    select: 'profilePic',
  });
});
const Message = mongoose.model('message', MessageSchema);

module.exports = Message;
