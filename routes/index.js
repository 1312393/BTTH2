var express = require('express');
var router = express.Router();
require('../models/users');
router.get('/', function(req, res) {

    res.render('index', {
        title: 'Home page',
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });

    //var username = "phan@gmail.com";
    //var password = "12234";
    //
    //mongoose.model('users').find( {'email' : username, 'password' : password }, function(err,A) {
    //    var B = mongoose.model('users');
    //
    //    console.log(JSON.stringify(B.password));
    //});

});

module.exports = router;

