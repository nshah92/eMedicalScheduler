var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    patientemail: {type: String, required: true},
    patientfirstname: {type: String, required: true},
    patientlastname: {type: String, required: true},
    patientinsurance: {type: String, required: true},
    patientflexibility: {type: String, required: true},
    patientspecialneed : {type: String},
    patientreason: {type: String, required: true},
    doclicense: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Appointment', schema);