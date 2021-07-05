const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ejs = require('ejs');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/vendor', express.static(__dirname + 'public/vendor'));

mongoose.connect(uri, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', (err) => {
    if(err) throw err;
    console.log('connected to MongoDB');
});

// User database
const User = require('./models/user.model');

// Passport
const initializePassport = require('./admin/passport-config');
initializePassport(passport, async (username)=> {
    await User.findOne({username : username});
    await User.findById(user.__id);
});

// Flash & Session
app.use(flash());
app.use(session({
   secret: process.env.SECRET_KEY,
   resave: false,
   saveUninitialized: false,
//    store: MongoStore.create({mongoUrl: uri})
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) =>{
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: 'home',
    failureRedirect: '/',
    failureFlash: true
}));

const homeRoute = require('./routes/home');
const predictionRoute = require('./routes/prediction');
const userRoute = require('./routes/user');

app.use('/', homeRoute);
app.use('/prediction', predictionRoute);
app.use('/user', userRoute);

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Listening on port ${port}...`);
});

