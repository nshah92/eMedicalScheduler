var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function (req, res, next) {

    var patientEmail = req.body.patientemail;
    var patientFirstName = req.body.patientfirstname;
    var patientLastName = req.body.patientlastname;
    var patientReason = req.body.patientreason;
    var patientDate = req.body.date;
    var patientTime = req.body.time;
    var docFirstName = req.body.docfirstname;
    var docLastName = req.body.doclastname;
    var docClinicName = req.body.docclinicname;
    var docAddress = req.body.docaddress;
    var docCity = req.body.doccity;
    var docPostalCode = req.body.docpostalcode;
    var docProvince = req.body.docprovince;

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'emedicalscheduler@gmail.com',
            pass: 'webINFO999'
        }
    });
    
    var text = 'Hello ' + patientFirstName + ' ' + patientLastName + ', \n\nYou have an appointment with Doctor ' + docFirstName + ' ' + docLastName + 
    '.\nClinic - ' + docClinicName + '. ' + 
    '\nAddress - ' + docAddress + ', ' + docCity + ', ' + docProvince + ', ' + docPostalCode + 
    '\nReason - ' + patientReason + '.\nDate & Time - ' + patientDate + ', ' + patientTime + 
    '\n\nThank You.\nE-Medical Scheduler';
    var mailOptions = {
        from: 'emedicalscheduler@gmail.com', // sender address
        to: patientEmail, // list of receivers
        subject: 'E-Medical Scheduler Booking Confirmation', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({ yo: 'error' });
        } else {
            console.log('Message sent: ' + info.response);
            res.json({ yo: info.response });
        };
    });
});

module.exports = router;