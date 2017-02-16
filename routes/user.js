var express = require('express');
var router = express.Router();

var User = require('../models/user');


router.post('/', function (req, res, next) {
    var user = new User({
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        insuranceprovider: req.body.insuranceprovider,
        allergies: req.body.allergies,
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'User Registration failed',
                error: err
            });
        }
        res.status(201).json({
            message: 'User registration succesful',
            obj: result
        });
    });
});

module.exports = router;