var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');
var SaltAndHash = require('../password');

router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Register',
        remark: ''
    });
});
router.post('/register', function(req,res) {
    var salt = SaltAndHash.salt();
    var hash = SaltAndHash.hash(salt, req.body.password);

    var NewUser = new User({
        email : req.body.email,
        fullName : req.body.fullname,
        salt : salt,
        hash : hash
    });


    mongoose.model('users').find({email : req.body.email},function(err, user){
        if(user.length == 0) {
            if(!req.body.email || !req.body.password || !req.body.fullname){
                res.render('register', {
                    title: 'Register',
                    remark: 'still missing imformation'
                });
            }else {
                NewUser.save(function(err) {
                    if (err) throw err;
                });
                res.redirect('/');
            }

        }
        else {
            res.render('register', {
                title: 'Register',
                remark: 'Email already register'
            });
        };

    });

});


module.exports = router;