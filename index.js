const express = require("express");
const cookieParser = require('cookie-parser');
const UserModel = require("./models/user.model");
const NotesModel = require("./models/notes.model");
const { fetchAllNotes, fetchNoteWithId } = require("./controllers/notes");
const { cookieGuard } = require("./middlewares/cookieMiddleware");


require('dotenv').config();

const { createDbConnection } = require("./db");
const server = express();

// Parse incoming cookies
server.use(cookieParser());

// Parsing
server.use(express.urlencoded({extended: true}));

// set the view engine to ejs
server.set('view engine', 'ejs');

// configure static folder
server.use(express.static('public'));


// Landing Page
server.get('/', function (req, res) {
    res.render('pages/index');
});

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

// Dashboard Notes page
server.get('/dashboard', cookieGuard, async function (req, res) {
    const notes = await fetchAllNotes();
    res.render('pages/dashboard', {
        data: notes
    });
});

// Create Notes page
server.get('/createNotes', cookieGuard, function (req, res) {
    res.render('pages/createNotes');
});

server.get('/notes/:noteId', cookieGuard, async function (request, response) {
    const {noteId} = request.params;
    try {
        const note = await fetchNoteWithId(noteId);
        response.render('pages/noteDetails', {
            note
        });
    } catch(error) {
        response.render('pages/error', {
            error: error.message
        })
    }

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
server.post('/login', async (request, response) => {
    const {email, password} = request.body;
    try {
        const matchedUser = await UserModel.findOne({
            email
        });
        if(matchedUser.password === password) {
            response.cookie("auth", { email });
            return response.redirect(`${request.headers['origin']}/dashboard`)
        } else {
            response.render('pages/error', {
                error: "Bad Credentials"
            })
        }
    } catch(error) {
        response.render('pages/error', {
            error: error.message
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

// saveNoteFlow
server.post('/saveNote', async (request, response) => {
    console.log(request.body)
    try {
        const newMote = new NotesModel(request.body);
        const res = await newMote.save();
        if (res && res._id) {
            return response.redirect(`${request.headers['origin']}/dashboard`)
        }
    } catch (error) {
        response.render('pages/error', {
            error: error.message
        })
    }
});

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log('Server started');
    createDbConnection();
});