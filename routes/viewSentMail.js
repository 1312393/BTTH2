var express = require('express');
var router = express.Router();
var Mail = require('../models/mails');
router.get('/sentMail/:id', function (req, res) {
    Mail.findOne({_id: req.params.id}, function (err, mail) {
        if (!mail) {
            res.render('404');
        }
        else {
            if (req.user._id != mail.sender._id) {
                res.render('404');
            }
            else {
                res.render('viewSentMail', {
                    title: 'Mail',
                    mail: mail
                })
            }
        }
    }).populate('sender').populate('receiver');
});
module.exports = router;
/**
 * Created by Thanh Khoan on 5/4/2016.
 */
