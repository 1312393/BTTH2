var express = require('express');
var router = express.Router();
var User = require('../models/users');
function renderPage( remark, req, res){
    var friendList = [];
    User.findOne({email : req.user.email},function(err, user){
        user.friend.forEach(function(friend){
            friendList.push({"email" : friend.email, "fullName": friend.fullName});
        })
        res.render('friend', {
            title: 'friend',
            user: req.user,
            remark: remark,
            friendList : friendList
        });
    }).populate('friend');
}
router.get('/friend', function(req, res) {
    renderPage( "", req, res);
});
router.post('/friend', function(req,res) {
    if(!req.body.email){

        renderPage("need your friend's email", req, res);
    }
    else{
        var friendList = [];
        User.findOne({email : req.user.email},function(err, user){
            user.friend.forEach(function(friend){
                friendList.push(friend.email);
            })

            if(friendList.indexOf(req.body.email) >= 0){
                renderPage("already in your friend list", req, res);
            }
            else{
                 User.findOne({email : req.body.email},function(err, user){
                    if(!user) {
                        renderPage("there no user with this email", req, res);
                    }
                    else{
                        if(req.body.email === req.user.email){
                            renderPage("can not add friend yourself", req, res);
                        }
                        else{
                            User.update({email : req.user.email},{$push : {"friend" :{"_id" : user._id}}},function(err, user){
                            renderPage( "", req, res);
                            });
                        }
                    }
                 })
            }
        }).populate('friend');
};

});

module.exports = router;
