// Packages
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { app } = require('./configs/socket');

const User = require('./models/userModel');
const Comment = require('./models/commentModel');
const Conversation = require('./models/conversationModel');
const Message = require('./models/messageModel');
const Post = require('./models/postModel');

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const conversationRouter = require('./routes/conversationRoutes');
const messageRouter = require('./routes/messageRoutes');
const commentRouter = require('./routes/commentRoutes');

const globalErrorHandler = require('./contollers/errorController');
const AppError = require('./utils/appError');

dotenv.config();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/messages', messageRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/comments', commentRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.all('*', (req, res, next) => {
  next(new AppError(404, `Couldn't find ${req.originalUrl}`));
});

app.use(globalErrorHandler);
module.exports = app;
