
var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');

router.post('/', function (req, res, next) {
    var appointment = new Appointment ({
        patientemail: req.body.patientemail, 
        patientfirstname: req.body.patientfirstname,
        patientlastname: req.body.patientlastname,
        patientinsurance: req.body.patientinsurance,
        patientflexibility: req.body.patientflexibility,
        patientspecialneed: req.body.patientspecialneed,
        patientreason: req.body.patientreason,
        doclicense: req.body.doclicense,
        docfirstname: req.body.docfirstname,
        doclastname: req.body.doclastname,
        docclinicname: req.body.docclinicname,
        docaddress: req.body.docaddress,
        doccity: req.body.doccity,
        docpostalcode: req.body.docpostalcode,
        docprovince: req.body.docprovince,
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

router.delete('/', function(req, res, next){
    Appointment.findOne({patientemail: req.param('email'), doclicense: req.param('doclicense'), date: req.param('date'), time: req.param('time')}, 
     function(err, appointment){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err,
                stat: res.statusCode
            });
        }
        if (!appointment){
            return res.status(500).json({
                title: 'No Appointment Found',
                error: {appointment: 'Appointment not found'},
                stat: res.statusCode
            });
        }
        appointment.remove(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err,
                    stat: res.statusCode
                });
            }
            res.status(201).json({
                message: 'Appointment Deleted',
                obj: result,
                stat: res.statusCode
            });            
        });
    });    
});

module.exports = router;