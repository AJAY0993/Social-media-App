const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const { sendNotificationToAllUsers: sendNotification } = require('./firebase');

const postCreatorToFireBaseToken = {};
const watchComments = async () => {
  const commentChangeStream = Comment.watch();
  commentChangeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
      const comment = change.fullDocument;
      if (!postCreatorToFireBaseToken[comment.post]) {
        const post = await Post.findById(comment.post);
        const user = await User.findById(post.user);
        const token = user.firebaseToken;
        postCreatorToFireBaseToken[post._id] = token;
      }
      const token = postCreatorToFireBaseToken[comment.post];
      sendNotification([token], {
        title: 'Someone Commented on your post',
        body: comment.comment,
        type: 'newComment',
      });
    }
  });
};

module.exports = watchComments;
