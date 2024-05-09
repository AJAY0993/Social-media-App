const { ExpressPeerServer } = require('peer');
const { server } = require('./socket');

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/video-call',
});

module.exports = peerServer;
