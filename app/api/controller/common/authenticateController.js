const jwt = require("jsonwebtoken");
//  Load the connection


var User = require('../../../model/users');
var config = require('../../../../config/database');
var roleConfig = require('../../../../config/role-config');
var ValueSetter = require('./value-setter');
const ObjectID = require('mongodb').ObjectID;




module.exports.userUpdate = function(req,res,next){
  var role = req.user.role;
 

  if(!req.body.username ||!req.body.password || !req.body.email ){
      return res.json({success:false , msg:'Please Pass all the parameters' , data: req.body});
  } else {

    User.findOneAndUpdate({
      _id:req.user.id,
    },newauth,{
      upsert: true,
    },function(err, user){
      if(err){
        console.log(err);
        return res.json({success:false , msg:"Error occured on update of registration" , err:err});
      }
      if(user){
        return res.json({success:true, msg:"Succesfully updated"});
      }
      else{
        return res.json({success:false, msg:"Couldnot Update User !!! Try again later"});
      }
    });
}
                
 
}

// module.exports.authenticate =function(req, res  ) {
//   User.findOne({
//     username: req.body.username,
//     isVerify:true,
//   }, function(err, user) {
//     if (err) throw err;
 
//     if (!user) {
//       res.send({success: false, msg: 'Authentication failed. User not found.'});
//     } else {
//       // check if password matches
//       var role = user.role;
//       var secretkey = config.secret;
//       user.comparePassword(req.body.password, function (err, isMatch) {
//         if (isMatch && !err) {
//           // if user is found and password is right create a token
//           payload = {userid: user.id , role:user.role};
//           var token = jwt.sign(payload, secretkey);
//           res.json({success: true, token:  token  });
//         } else {
//           res.send({success: false, msg: 'Authentication failed. Wrong password.', err:err});
//         }
//       });
//     }
//    // res.send({success:false , msg:user , err:err});
//   });
// }

module.exports.register = function(req, res , next){
  var secretkey=config.secretkey;
  // var role = req.user.role;
  var role;
   if(req.status){
     role= req.role;
   }
   else{
     role= "";
   }
  var newUserInfo =  ValueSetter.userValueSetter(req.body , role);
  // return res.json(newUserInfo);
  var newUser = new User(newUserInfo);
  //return res.json({user:newUser});
  newUser.save(function(err,user){
    // console.log("inside save user");
    // return res.json({inside:"saveuser"});
    if(err){
      return res.json({success:false, msg:"error occurred" ,err:err});
    }
      var payload = {userid: user._id , role:user.role};
       console.log(payload);
       var token = 'JWT ' + jwt.sign(payload, secretkey);
       if(!req.status){
          return res.json({success:true , user:user , msg:"Successfully !! added "+ user.role+" user " ,token:token });
       }
       else {
          req.org = user;
          // return res.json({success:true , org:req.org});
          next();
       }
  });
 
}


module.exports.authenticate = function(req,res,next){
   var secretkey=config.secretkey;
    User.findOne({
      username: req.body.username,
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          res.json({success: false, msg: 'Authentication failed. User not found.'});
        } else {
        var passcom= user.comparePassword(req.body.password);
        if(passcom){
          var payload = {userid: user._id , role:user.role};
           console.log(payload);
           var token = 'JWT ' + jwt.sign(payload, secretkey);
           res.json({success: true, token:  token  , role:user.role});
        }
        else {
          res.json({success:false , msg:"Password mismatch error"});
        }

        }
      });
        
  
}