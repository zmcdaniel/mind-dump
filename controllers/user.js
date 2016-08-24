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

// app.post("/post/new", function(req, res){
//   console.log(req.body);
//   db.author.findOne({where: {id: req.body.author}}).then(function(author){
//     if(author){
//       author.createPost({
//         title: req.body.title,
//         content: req.body.content
//       }).then(function(post){
//         console.log(post.get());
//         res.send("Successfully added");
//       });
//     }
//     else {
//       res.send("Uh oh, didn't get added.");
//     }
//   })
// });

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

