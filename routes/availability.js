var express = require('express');
var router = express.Router();

var Availability = require('../models/availability');

router.post('/', function (req, res, next) {
    var availability = new Availability({
        doclicense: req.body.doclicense,
        docdate: req.body.docdate, 
        doctime: req.body.doctime
    });
    availability.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Doc Availability failed',
                error: err
            });
        }
        res.status(201).json({
            message: 'Doc Availability successful',
            obj: result
        });
    });
});

module.exports = router;