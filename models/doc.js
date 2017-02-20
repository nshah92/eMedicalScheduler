var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    docfirstname: {type: String, required: true},
    doclastname: {type: String, required: true},
    docemail: {type: String, required: true, unique: true},
    docpassword: {type: String, required: true},
    docspeciality: {type: String, required: true},
    doclicense: {type: String, required: true},
    docclinicname: {type: String, required: true},
    docaddress: {type: String, required: true},
    doccity: {type: String, required: true},
    docpostalcode: {type: String, required: true},
    docprovince: {type: String, required: true},
    docwebsite: {type: String, required: true}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Doc', schema);