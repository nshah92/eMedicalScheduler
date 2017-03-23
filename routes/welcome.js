var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function (req, res, next) {

    var userEmail = req.body.email;
    var userFirstName = req.body.firstname;
    var userLastName = req.body.lastname;

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'emedicalscheduler@gmail.com',
            pass: 'webINFO999'
        }
    });
    
    var text = 'Hello ' + userFirstName + ' ' + userLastName + ', \n\nWelcome to E-Medical Scheduler.\n\nThe premiere scheduling application for' 
    + ' healthcare. You can edit your personal information on the platform by selecting \'Edit Profile\'.' +
    '\n\nThank You.\nE-Medical Scheduler';
    var mailOptions = {
        from: 'emedicalscheduler@gmail.com', // sender address
        to: userEmail, // list of receivers
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