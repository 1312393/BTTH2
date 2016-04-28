var express = require('express');
var router = express.Router();
require('../models/users');
router.get('/', function(req, res) {

    res.render('index', {
        title: 'Home page',
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });

});

module.exports = router;

