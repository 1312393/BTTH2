var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var SaltAndHash  = require('./password');

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
}
passport.use(new Strategy(function(username, password, cb){
    User.findOne( {email : username}, function(err, user){
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if(SaltAndHash.validate(user.hash, user.salt,password))return cb(null, user);
        return cb(null, false);
    });
}));

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
var friend = require('./routes/friend');
app.get('/friend',Ensureauthencated, friend);
app.post('/friend',friend);

var mail = require('./routes/mail');
app.get('/mail',Ensureauthencated, mail);
app.post('/mail', mail);

var register = require('./routes/register');
app.get('/register',register);
app.post('/register',register);

var sentMail = require('./routes/sentMail');
app.get('/sentMail',Ensureauthencated,sentMail);

var viewMail = require('./routes/viewMail');
app.get('/:id',Ensureauthencated,viewMail);

var viewMail = require('./routes/viewSentMail');
app.get('/sentMail/:id',Ensureauthencated,viewMail);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('connect to host');
});

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://nguyenphung:123456@ds011872.mlab.com:11872/wb9315db';

mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});




