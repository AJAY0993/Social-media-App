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
const userIdToPeerIdMap = {};
const socketIdToPeerIdMap = {};

io.on('connection', (socket) => {
  const { userId } = socket.handshake.query;
  const socketId = socket.id;
  socketIdToUserIdMap[socket.id] = userId;
  userIdToSocketIdMap[userId] = socketId;

  io.emit('event:onlineUsers', Object.values(socketIdToUserIdMap));

  // socket.on('event:message', ({ message, recieverId, createdBy }) => {
  //   socket.to(userIdToSocketIdMap[recieverId]).emit('event:message', {
  //     message,
  //     createdBy: socketIdToUserIdMap[socketId],
  //   });
  // });

  socket.on('event:addPeer', (id) => {
    socketIdToPeerIdMap[socketId] = id;
    userIdToPeerIdMap[userId] = id;
    io.emit('event:getPeers', userIdToPeerIdMap);
  });

  socket.on('event:getSockets', () => {
    socket.to(socket.id).emit('event:getSockets', userIdToSocketIdMap);
  });

  socket.on('event:getPeerId', (id) => {
    socket.to(socket.id).emit('event:getPeerId', socketIdToPeerIdMap[id]);
  });

  socket.on('event:callRejected', (id) => {
    socket.to(userIdToSocketIdMap[id]).emit('callRejected');
  });

  socket.on('disconnect', () => {
    delete userIdToSocketIdMap[userId];
    delete socketIdToUserIdMap[socketId];
    delete socketIdToPeerIdMap[socketId];
    delete userIdToPeerIdMap[userId];
    io.emit('event:onlineUsers', Object.values(socketIdToUserIdMap));
    socket.emit('event:getPeers', userIdToPeerIdMap);
  });
});

module.exports = { server, app, io, userIdToSocketIdMap, socketIdToUserIdMap };
