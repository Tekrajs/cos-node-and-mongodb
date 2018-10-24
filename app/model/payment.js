// Required Package
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// var config      = require('../../config/database');


// Mongoose model for Payment
var paymentSchema = mongoose.Schema({
    name: String,
    updated_at : { type : Date, default: Date.now },
});


module.exports = mongoose.model('payment', paymentSchema);
