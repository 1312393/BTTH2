var express = require('express');
var router = express.Router();
var Mail = require('../models/mails');
router.get('/:id', function (req, res) {
    Mail.update({_id: req.params.id}, {$set: {seen: true}}, function (err, tank) {
        Mail.findOne({_id: req.params.id}, function (err, mail) {
            if (!mail) {
                res.render('404');
            }
            else {
                if (req.user._id != mail.receiver) {
                    res.render('404');
                }
                else {
                    res.render('viewMail', {
                        title: 'Mail',
                        mail: mail
                    })
                }
            }
        }).populate('sender');
    });
});
module.exports = router;