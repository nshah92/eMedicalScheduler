var express = require('express');
var router = express.Router();
var Flexible = require('../models/flexible');

router.post('/', function (req, res, next) {
    var flexible = new Flexible({
        email: req.body.email,
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        date: req.body.date,
        time: req.body.time,
        datetime: req.body.datetime,
        doclicense: req.body.doclicense,
        doclastname: req.body.doclastname
    });
    flexible.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Failed to write data',
                error: err
            });
        }
        res.status(201).json({
            message: 'Successful',
            obj: result
        });
    });
});

router.get('/', function(req,res,next){
    Flexible.find()
        .exec(function(err, allrecords){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'fetch flexible appointment Successful',
            obj: allrecords
        });  
    });
});

router.delete('/', function(req, res, next){
    Flexible.findOne({
        email: req.param('email'), 
        date: req.param('date'),
        time: req.param('time'),
        doclicense: req.param('doclicense')
    }, 
     function(err, flexible){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!flexible){
            return res.status(500).json({
                title: 'No flexible Appointment Found',
                error: {flexible: 'Appointment not found'}
            });
        }
        flexible.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Flexible Availability Deleted',
                obj: result
            });            
        });
    });    
});

module.exports = router;