var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Doc = require('../models/doc');

router.post('/', function (req, res, next) {
    var doc = new Doc({
        docfirstname: req.body.docfirstname, 
        doclastname: req.body.doclastname,
        docemail: req.body.docemail,
        docpassword: bcrypt.hashSync(req.body.docpassword, 10),
        docspeciality: req.body.docspeciality,
        doclicense: req.body.doclicense,
        docclinicname: req.body.docclinicname,
        docaddress: req.body.docaddress,
        doccity: req.body.doccity,
        docpostalcode: req.body.docpostalcode,
        docprovince: req.body.docprovince,
        docuni: req.body.docuni
    });
    doc.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Doc Registration failed',
                error: err
            });
        }
        res.status(201).json({
            message: 'Doc registration successful',
            obj: result
        });
    });
});

router.get('/', function (req, res, next) {
    Doc.find({doccity: req.param('lplocation'), docspeciality: req.param('lpspeciality')})
        .exec(function (err, docs) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            var token = jwt.sign({docs: 'somevalue'}, '$ecret', {expiresIn: 7200});
            res.status(200).json({
                message: 'Success',
                token: token,
                obj: docs
            });
        });
}); 

module.exports = router;