var express = require('express');
var router = express.Router();
var Mail = require('../models/mails');
var User = require('../models/users');
function renderMail(req, res, remark){
    User.findOne({email : req.user.email},function(err, user){
        var friendList = [];
        user.friend.forEach(function(friend){
            friendList.push({"email" : friend.email, "fullName": friend.fullName, id : friend._id});
        });
        res.render('mail',{
            title : 'Send mail',
            remark : remark,
            user : user,
            friendList : friendList
        })
    }).populate('friend');
}
router.get('/mail', function(req, res) {
    renderMail(req, res,  '');

});
router.post('/mail', function(req,res){

    if(!req.body.email || !req.body.title || !req.body.message) {
        renderMail(req, res, 'need to write all the information');
    }
    else{
        console.log(req.body.email);
        User.findOne({email : req.body.email}, function (err, user){
            if(user.friend.indexOf(req.user._id) === -1){
                renderMail(req, res, "you are not the receiver's friend");
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