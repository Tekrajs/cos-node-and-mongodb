// Required Package
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Mongoose model for Sale
var saleSchema = mongoose.Schema({
    time: { type: Date, default: Date.now },
    branch: { type: mongo.Schema.Types.ObjectId, ref: 'branch' },
    // organization: { type: mongo.Schema.Types.ObjectId, ref: 'org' },
    food: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'food',
        category: { type: mongo.Schema.Types.ObjectId, ref: 'category' },
        rate: Number,
        quantity: Number,
    }],
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'payment',
      amount: Number,
    },
    feedback: String,
    approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});


module.exports = mongoose.model('sales', saleSchema);
