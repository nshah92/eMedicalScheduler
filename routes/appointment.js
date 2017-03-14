
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
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
        date: req.body.date,
        time: req.body.time,
    });
    appointment.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Scheduling an Appointment failed',
                error: err
            });
        }
        res.status(201).json({
            message: 'Appointment was successful',
            obj: result
        });
    });
});

module.exports = router;