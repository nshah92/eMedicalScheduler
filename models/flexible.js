var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    datetime: {type: Number, required: true},
    doclicense: {type: String, required: true},
    doclastname: {type: String, required: true},
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Flexible', schema);