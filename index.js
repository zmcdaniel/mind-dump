// ============
// DEPENDENCIES
// ============
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');

var app = express();

// ============
// SET/USE STATMENTS
// ============

app.set('view engine', 'ejs');

// Static routing for images and CSS
app.use(express.static(__dirname + '/public'));

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'abcdefghijklmnopqrstuvwxyz',
  resave: false,
  saveUninitialized: true
}));

// Flash messages
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// ============
// ROUTES
// ============

// Landing page
app.get('/', function(req, res) {
  res.render('index');
});

// Main page after logging in
app.get('/user/main', isLoggedIn, function(req, res) {
  res.render('user/main');
});

// Saves the main page content.
app.post('/user/main', isLoggedIn, function(req, res, body) {
  var postContent = req.body.content;
  if (postContent.length > 5) {
    res.send(postContent);
  } else {
    res.send('Must be longer than 5 characters');
  }
});

// Writing archive page
app.get('/user/archive', isLoggedIn, function(req, res) {
  res.render('user/archive');
});

// Show writing from particular date
app.get('/user/archive/:id', isLoggedIn, function(req, res) {
  res.render('user/archive/:id');
});

// About page. Misc info and FAQ
app.get('/user/about', isLoggedIn, function(req, res) {
  res.render('user/about');
});

// Settings page. Change your email, password, name.
app.get('/user/settings', isLoggedIn, function(req, res) {
  res.render('user/settings');
});

// // POST changes to email, password, or name
// app.post('/user/settings', isLoggedIn, function(req, res){
//   res.send('POST from settings');
// });

// Auth controller
app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
