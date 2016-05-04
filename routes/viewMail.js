var express = require('express');
var router = express.Router();
var Mail = require('../models/mails');
router.get('/:id', function (req, res) {
        Mail.findOne({_id: req.params.id}, function (err, mail) {
            if (!mail) {
                res.render('404');
            }
            else {
                console.log(mail);
                console.log(req.user);
                if (req.user._id != mail.receiver._id){
                    res.render('404');
                }
                else {
                    Mail.update({_id: req.params.id}, {$set: {seen: true}}, function (err, tank) {
                        res.render('viewMail', {
                            title: 'Mail',
                            mail: mail
                        })
                    });
                }
            }
        }).populate('sender').populate('receiver');

});
module.exports = router;