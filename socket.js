// Socket events file

var redis = require('redis');
var sub = redis.createClient();
var pub = redis.createClient();
sub.subscribe('chat', 'typing');

module.exports = function (io) {
  io.on('connection', function (socket) {

    // receiving a clients message data
    socket.on('chat', function (data) {
      // publishing message to all clients
      pub.publish('chat', JSON.stringify({
        user: socket.handshake.session.user !== undefined ? socket.handshake.session.user : data.user,
        message: data.message
      }));
    });
    
    // receiving a clients writing information
    socket.on('typing', function (data) {
      // publishing who's writing data to all clients
      pub.publish('typing', JSON.stringify({
        user: socket.handshake.session.user !== undefined ? socket.handshake.session.user : data.user,
        typing: data.typing
      }));
    });

    sub.on('message', function (channel, message) {
      socket.emit(channel, message);
    });
  })
}