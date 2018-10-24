// Required Package
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var menuSchema = mongoose.Schema({
    name: {
      type: String,
    },
    description:{
      type:String,
    },
    photo:{
      type:String,
    },
    alternate_name:{
      type:String,
    },
    price:{
      type:String,
    }
});

var categorySchema = mongoose.Schema({

    name:String,
    description:String,
    hasItem:{
      type:Boolean,
      default:false,
    },
    branch_id:{
      type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'food',
    },
    items:[menuSchema],

});
module.exports = mongoose.model('food', categorySchema);