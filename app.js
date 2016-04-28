var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var User = require('./models/users');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(expressSession( {
    secret : process.env.SESSION_SECRET || 'secret',
    resave : false,
    saveUninitialized : false
} ));

app.use(passport.initialize());
app.use(passport.session());

function Ensureauthencated(req,res,next) {
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/login');
    }
};
passport.use(new Strategy(function(username, password, cb){

    User.findOne( {email : username, password : password }, function(err, user){

        console.log(user);
        console.log(user.email);
        if (err) { return cb(err); }
        if (user.length == 0) { return cb(null, false); }
        return cb(null, user);
        //return cb(null, {id : "121212", email: 'asdasd', password:'123123'});
    });
}));
//passport.serializeUser(function(user, cb) {
//    console.log(user);
//    cb(null, user.email);
//});
//passport.deserializeUser(function(email, cb) {
//    mongoose.model('users').find({'email' : email}, function (err, user) {
//        if (err) { return cb(err); }
//        cb(null, user);
//    });
//});

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var routes = require('./routes/index');
app.get('/',routes);
var login = require('./routes/login');
app.get('/login',login);
app.post('/login',passport.authenticate('local',{ failureRedirect: '/login' }),login);
app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});
var register = require('./routes/register');
app.get('/register',register);
app.post('/register',register);
app.listen(3000, function(){
    console.log('http://localhost:3000');
    mongoose.connect('mongodb://localhost/WebData')
});
