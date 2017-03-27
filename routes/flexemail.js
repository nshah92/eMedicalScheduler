var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var date = req.body.date;
    var time = req.body.time;
    var doclastname = req.body.doclastname;

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'emedicalscheduler@gmail.com',
            pass: 'webINFO999'
        }
    });
    
    var text = 'Hello ' + firstName + ', \n\n You are recieving this email because you have a flexible appointment with Doctor ' + doclastname + '.' +
    '\nI will like to inform you we have an opening earlier than your appointment:' +
    '\n\n Date: ' + date + '\nTime: ' + time +
    '\n\n You have an hour to confirm this appointment before this is passed on to another Patient.' +
    '\n\nThank You.\nE-Medical Scheduler';
    var mailOptions = {
        from: 'emedicalscheduler@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'E-Medical Scheduler: Earlier Appointment Found', // Subject line
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