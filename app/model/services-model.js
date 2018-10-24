var mongoose = require('mongoose');

var ServicesSchema = new mongoose.Schema({
  servicename: String,
  description: String,
  // price: Number,
  updated_at: { type: Date, default: Date.now },
});

var model = mongoose.model('Services', ServicesSchema);
module.exports = model;
