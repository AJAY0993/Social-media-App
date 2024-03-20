/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
const admin = require('../configs/fireBase');

const sendNotificationToAllUsers = async (tokens, message) => {
  try {
    const promises = tokens.map(async (token) => {
      return await admin.messaging().send({
        token,
        webpush: {
          data: {
            title: message.title,
            body: message.body,
            type: message.type,
            icon: 'https://i.ibb.co/KFhZR4g/chat-app-logo.png',
          },
        },
      });
    });
    await Promise.all(promises);
    console.log('notification sent successfully');
  } catch (err) {
    console.log(err);
  }
};
module.exports = sendNotificationToAllUsers;
