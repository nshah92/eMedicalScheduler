var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function (req, res, next) {

    var patientEmail = req.body.patientemail;
    var docFirstName = req.body.docfirstname;
    var docLastName = req.body.doclastname;
    var patientReason = req.body.patientreason;
    var patientDate = req.body.date;
    var patientTime = req.body.time;

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'emedicalscheduler@gmail.com',
            pass: 'webINFO999'
        }
    });
    
    var text = 'Hello, \n\n You have an appointment with Doctor ' + docFirstName + ' ' + docLastName + 
    '.\nReason - ' + patientReason + '.\nDate & Time - ' + patientDate + ', ' + patientTime + 
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