// Required Package
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
// var config      = require('../../config/database');



// For Counter Purpose i.e Auto Increment
// var CounterSchema = mongoose.Schema({
//     seq: { type: Number, default: 0 }
// });


// Mongoose Model for Users
var UserSchema = mongoose.Schema({
username: {
    index:true,
    required:true,
    unique: true,
    type: String,
    dropDups: true,
},
password: {
    required: true,
    type: String
},
email:{
    type:String,
},
is_verify:{
    type:Boolean,
},
phone_no:{
   type:Number,
},
role:{
    required:true,
    type:String,
},
last_login:{
    required:true,
    type:Date,
},
avatar:{
  type:String,
},
status : {
    type:String,
}

});


UserSchema.pre('save', function (next) {
    var user = this;
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    next();  
});
UserSchema.pre('findOneAndUpdate', function(next) {
    var user = this;
    var field= user._update;
    if(field.password){
        console.log(field);
        field.password = bcrypt.hashSync(field.password, bcrypt.genSaltSync(8), null);
        next();
    }
    else {
        next();
    }
   
});




UserSchema.methods.comparePassword = function (passw) {
  console.log(this.password);
    return bcrypt.compareSync(passw,this.password);
};



 

module.exports = mongoose.model('users', UserSchema);