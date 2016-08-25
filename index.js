// ============
// DEPENDENCIES
// ============
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var info = require('session-info');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');

var app = express();
var db = require('./models');

// ============
// SET/USE STATMENTS
// ============

app.set('view engine', 'ejs');

// Static routing for images and CSS
app.use(express.static(__dirname + '/public'));

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Sessions and session info
app.use(session({
  secret: process.env.SESSION_SECRET || 'abcdefghijklmnopqrstuvwxyz',
  resave: false,
  saveUninitialized: true
}));
app.use(info());

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
  res.render('home/index');
});

// Main page after logging in
app.get('/user/main', isLoggedIn, function(req, res) {
  res.render('user/main');
});

// Saves the main page content.
app.post('/user/main', isLoggedIn, function(req, res, body) {
  db.post.create({
      content: req.body.content
    }).then(function(post) {
      res.redirect('/user/archive');
    });
});

// Writing archive page
app.get('/user/archive', isLoggedIn, function(req, res) {
  res.render('user/archive');
});

// Show writing from particular date
app.get('/user/archive/:id', isLoggedIn, function(req, res) {
  db.post.find({
    where: { id: req.params.id }
  })
  .then(function(post) {
    if (!post) throw Error();
    res.render('user/show', { post: content });
  })
  .catch(function(error) {
    res.status(400).send('404');
  });
});

// About page. Misc info and FAQ
app.get('/user/about', isLoggedIn, function(req, res) {
  res.render('user/about');
});

// Settings page. Change your email, password, name.
// Work on this last
app.get('/user/settings', isLoggedIn, function(req, res) {
  res.render('user/settings');
});

// POST changes to email, password, or name
// Work on this last
app.post('/user/settings', isLoggedIn, function(req, res){
//   res.send('POST from settings');
});



// ============
// CONTROLLERS
// ============

app.use('/auth', require('./controllers/auth'));
//app.use('/user', require('./controllers/user'));



// ============
// LISTENERS
// ============

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
