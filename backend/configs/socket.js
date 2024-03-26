const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const userIdToSocketIdMap = {};
const socketIdToUserIdMap = {};

io.on('connection', (socket) => {
  const { userId } = socket.handshake.query;
  const socketId = socket.id;
  console.log('someone connected');
  socketIdToUserIdMap[socket.id] = userId;
  userIdToSocketIdMap[userId] = socketId;

  io.emit('event:onlineUsers', Object.values(socketIdToUserIdMap));

  socket.on('event:message', ({ message, recieverId, createdBy }) => {
    socket.to(userIdToSocketIdMap[recieverId]).emit('event:message', {
      message,
      createdBy: socketIdToUserIdMap[socketId],
    });
  });

  socket.on('disconnect', () => {
    delete userIdToSocketIdMap[userId];
    delete socketIdToUserIdMap[socketId];
    io.emit('event:onlineUsers', Object.values(socketIdToUserIdMap));
  });
});

module.exports = { server, app, io, userIdToSocketIdMap, socketIdToUserIdMap };
