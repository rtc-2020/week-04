var socket = io.connect('/');

socket.on('message', function(data) {
  console.log('Message received: ' + data);
});

// TODO: Why isn't the server getting this message?
// socket.emit('message received', 'boom');
