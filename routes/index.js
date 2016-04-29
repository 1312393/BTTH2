var express = require('express');
var router = express.Router();
var Mail = require('../models/mails');
router.get('/', function(req, res) {
    if(!req.isAuthenticated()) {
        res.render('index', {
            title: 'Home page',
            isAuthenticated: req.isAuthenticated(),
            user: null,
            mailList: null
        });
    }
    else {
        Mail.find({receiver : req.user._id}, function(err,mail){
            var mailList = [];
            mail.forEach(function(mail){
               mailList.push({fullName : mail.sender.fullName, title : mail.title, _id : mail._id, seen : mail.seen , createAt : mail.createAt});
            });
            mailList.reverse();
            res.render('index', {
                title: 'Home page',
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
                mailList: mailList
            });
        }).populate('sender');

    }


});

module.exports = router;

