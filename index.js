const express = require("express");

const server = express();

// set the view engine to ejs
server.set('view engine', 'ejs');

// configure static folder
server.use(express.static('public'));

// use res.render to load up an ejs view file

// Signin page
server.get('/signin', function(req, res) {
    res.render('pages/index');
  });
  
// Create account page
server.get('/createAccount', function(req, res) {
    res.render('pages/signup');
});

// Forgot password page
server.get('/forgotPassword', function(req, res) {
    res.render('pages/forgotPassword');
});

// Confirm random string page
server.get('/confirmRandomString', function(req, res) {
    res.render('pages/confirmString');
});

// Confirm random string page
server.get('/createPassword', function(req, res) {
    res.render('pages/createPassword');
});

server.listen(10000, "0.0.0.0", () => {
    console.log('Server started')
});