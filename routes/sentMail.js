var express = require('express');
var router = express.Router();
var Mail = require('../models/mails');
router.get('/sentMail', function(req, res) {
    Mail.find({sender : req.user._id}, function(err,mail){
        res.render('sentMail',{
            title : 'Sent mail',
            mailList : mail
        })
    }).populate('receiver');

});
module.exports = router;
