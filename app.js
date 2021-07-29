// App module file

// Importing Libraries
const express = require('express');
const socket = require('socket.io');
const redis = require('redis');
const path = require('path');
const expressSession = require('express-session');
const connectRedis = require('connect-redis');

// Local Constants
const SECRET = 'chatappSecretKey';

// Redis and Express Session Setup, Client init
const redisStore = connectRedis(expressSession);
const redisClient = redis.createClient();
const sessionStore = new redisStore({ client: redisClient });

// Express app and express session init
const app = express();
const session = expressSession({
  store: sessionStore,
  key: 'chatappCookieKey',
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
  proxy: true
});

// View Engine Setup,
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Binding to app module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(session);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = require('./routes');
app.use('/', routes);

app.sessionStore = sessionStore;
app.session = session;

module.exports = app;