
var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');

router.post('/', function (req, res, next) {
    var appointment = new Appointment ({
        patientemail: req.body.patientemail, 
        docfirstname: req.body.docfirstname,
        doclastname: req.body.doclastname,
        patientinsurance: req.body.patientinsurance,
        patientflexibility: req.body.patientflexibility,
        patientspecialneed: req.body.patientspecialneed,
        patientreason: req.body.patientreason,
        doclicense: req.body.doclicense,
        date: req.body.date,
        time: req.body.time,
    });
    appointment.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Scheduling an Appointment failed',
                error: err,
                stat: res.statusCode
            });
        }
        res.status(201).json({
            message: 'Appointment was successful',
            obj: result,
            stat: res.statusCode
        });
    });
});

router.get('/:patientemail', function(req, res, next) {
    Appointment.find({patientemail: req.params.patientemail}, function (err, schedule){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err,
                stat: res.statusCode
            });
        }
        res.status(200).json({
            message: 'fetch appointment Successful',
            obj: schedule,
            stat: res.statusCode
        });                
    });
});

module.exports = router;