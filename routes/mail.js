var express = require('express');
var router = express.Router();
var Mail = require('../models/mails');
var User = require('../models/users');

router.get('/mail/:id', function(req, res) {
    User.findOne({_id : req.params.id}, function(err,user){
        if(!user)
        {
            res.render('404');
        }
        res.render('mail',{
            title : 'Send mail',
            remark : '',
            user : user
        })
    });

});
router.post('/mail/:id', function(req,res){

    if(!req.body.email || !req.body.title || !req.body.message) {
        res.render('mail',{
            title : 'Send mail',
            remark : 'need to write all the information'
        });
    }
    else{
        User.findOne({email : req.body.email}, function (err, user){
            if(user.friend.indexOf(req.user._id) === -1){
                res.render('mail',{
                    title : 'Send mail',
                    user : user,
                    remark : "you are not the receiver's friend"
                });
            }
            else{
                var date = new Date();
                var newMail = new Mail({
                    sender : req.user._id,
                    title : req.body.title,
                    message : req.body.message,
                    receiver: user._id,
                    createAt : date,
                    seen : false
                });
                newMail.save(function(err) {
                    if (err) throw err;
                });
                res.redirect('/');
            }
        });
    }
});
module.exports = router;