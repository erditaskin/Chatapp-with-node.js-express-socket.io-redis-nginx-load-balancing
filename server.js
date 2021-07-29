// Server File

// Dependencies
const app = require('./app');
const http = require('http');
 
// Fetching desired port if it starts by pm2 or other load balancer with given port
const port = process.argv[2] || process.env.PORT || '3000';
app.set('port', port);

// Initializing server and socket.io
const server = http.createServer(app); 
const socketIO = require('socket.io');
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

// Added session to socket.io
const socketExpressSession = require('socket.io-express-session'); 
io.use(socketExpressSession(app.session));

// Importing socket events
const socketEvents = require('./socket');
socketEvents(io);

// Starting server on desired port
server.listen(port);