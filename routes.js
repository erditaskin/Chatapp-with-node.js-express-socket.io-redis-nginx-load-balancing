// Route module file

var express = require('express');
var router = express.Router();


// Actual Chat page
router.get('/chat', function (req, res) {
  if (req.session.user) res.render('chat', { title: 'ChatApp', user: req.session.user });
  else res.redirect('/logout');
});

// Home page without auth
router.get('/', function (req, res) {
  if (!req.session.user) res.render('index', { title: 'ChatApp' });
  else res.redirect('/chat');
});

// Auth post request - nickname entrance request
router.post('/', function (req, res) {
  req.session.user = req.body.user;
  res.redirect('/chat');
});

// Logout
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;