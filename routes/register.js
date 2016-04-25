var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/register', function(req, res) {
    res.render('register', {
        title: 'Register',
        remark: ''
    });
});
router.post('/register', function(req,res) {


    var User =  mongoose.model('users');
    var NewUser = new User({
        email : req.body.email,
        password : req.body.password,
        fullname : req.body.fullname
    });
    console.log(NewUser.email);
    mongoose.model('users').find({email : req.body.email},function(err, User){
        if(User.length == 0) {
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