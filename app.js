var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

var routes = require('./routes/index');
app.get('/',routes);
var login = require('./routes/login');
app.get('/login',login);

app.listen(3000, function(){
    console.log('http://localhost:3000');
    mongoose.connect('mongodb://localhost/WebData')
});
