const express = require("express");
const { createDbConnection } = require("./db");
const UserModel = require("./models/user.model");

const server = express();

// Parsing
server.use(express.urlencoded({extended: true}));

// set the view engine to ejs
server.set('view engine', 'ejs');

// configure static folder
server.use(express.static('public'));

// use res.render to load up an ejs view file Signin page
server.get('/signin', function (req, res) {
    res.render('pages/index');
});

// Create account page
server.get('/createAccount', function (req, res) {
    res.render('pages/signup');
});

// Forgot password page
server.get('/forgotPassword', function (req, res) {
    res.render('pages/forgotPassword');
});

// Confirm random string page
server.get('/confirmRandomString', function (req, res) {
    res.render('pages/confirmString');
});

// Confirm random string page
server.get('/createPassword', function (req, res) {
    res.render('pages/createPassword');
});

server.get('/dashboard', function (req, res) {
    res.render('pages/dashboard');
});

server.get('/error', function (req, res) {
    res.render('pages/error', {
        error: "Something went wrong"
    })
})

// HandleLogin
server.post('/signup', async (request, response) => {
    try {
        const newUSer = new UserModel(request.body);
        const res = await newUSer.save();
        if (res && res._id) {
            return response.redirect(`${request.headers['origin']}/signin`)
        }
    } catch (error) {
        response.render('pages/error', {
            error: error.message
        })
    }
})

// HandleLogin
server.post('/login', (request, response) => {
    const {email, password} = request.body;
    if (email && password) {
        return response.redirect(`${request.headers['origin']}/dashboard`)
    } else {
        response.render('pages/error', {
            error: "Bad Credentials"
        })
    }
})

// forgotPasswordEmailFlow
server.post('/checkEmail', (request, response) => {
    const {email} = request.body;
    console.log(request);
    if (email) {
        return response.redirect(`${request.headers['origin']}/confirmRandomString`)
    } else {
        response.render('pages/error', {
            error: "Email not found"
        })
    }
})

// confirmStringFLow
server.post('/checkRandomString', (request, response) => {
    const {otp} = request.body;
    if (otp) {
        return response.redirect(`${request.headers['origin']}/createPassword`)
    } else {
        response.render('pages/error', {
            error: "random string is missing"
        })
    }
})

// savePasswordFlow
server.post('/savePassword', (request, response) => {
    const {password} = request.body;
    if (password) {
        return response.redirect(`${request.headers['origin']}/signin`)
    } else {
        response.render('pages/error', {
            error: "Could not save password"
        })
    }
});

server.listen(3000, "localhost", () => {
    console.log('Server started');
    createDbConnection();
});