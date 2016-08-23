var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.use(session({
  secret: process.env.SESSION_SECRET || 'abcdefghijklmnopqrstuvwxyz',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// Landing page
app.get('/', function(req, res) {
  res.render('index');
});

// Main page after logging in
app.get('/main', isLoggedIn, function(req, res) {
  res.render('main');
});

app.post('/main', isLoggedIn, function(req, res) {
  console.log(req.content);
  res.send('POST from main.');
});

// Writing archive page
app.get('/archive', isLoggedIn, function(req, res) {
  res.render('archive');
});

// Show writing from particular date
app.get('/archive/:id', isLoggedIn, function(req, res) {
  res.render('user/archive/:id');
});

// About page. Misc info and FAQ
app.get('/about', isLoggedIn, function(req, res) {
  res.render('about');
});

// Settings page. Change your email, password, name.
app.get('/settings', isLoggedIn, function(req, res) {
  res.render('settings');
});

// POST changes to email, password, or name
app.post('settings', isLoggedIn, function(req, res){
  res.send('POST from settings');
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
