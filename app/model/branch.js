// Required Package
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// var config      = require('../../config/database');



// For Counter Purpose i.e Auto Increment
// var CounterSchema = mongoose.Schema({
//     seq: { type: Number, default: 0 }
// });



var staffSchema = mongoose.Schema({
    full_name : String ,
    designation : String ,
    joining_date:Date ,
    permission:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'permission',
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    }



});


// Mongoose Model for Branch
var branchSchema = mongoose.Schema({
    organization_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    branch_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    } ,
    branch_info:{
        name:{
            type:String ,
            required:true,
        } ,
        address:{
            type:String ,
            required:true,
        },
        state: {
            type:String ,
            required:true,
        },
        postal_code:{
            type:Number ,
        },
    },
});



module.exports = mongoose.model('branch', branchSchema);
