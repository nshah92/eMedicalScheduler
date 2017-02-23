var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/', function (req, res, next) {
    var user = new User({
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, 10),
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

router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err,
                stat: res.statusCode
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials One'},
                stat: res.statusCode
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'},
                stat: res.statusCode
            });
        }
        var token = jwt.sign({user: user}, '$uper$ecure', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id,
            stat: res.statusCode,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            dob: user.dob,
            gender: user.gender,
            insurance: user.insuranceprovider,
            allergies: user.allergies
        });
    });
});

module.exports = router;