const jwt = require('jsonwebtoken');
var User = require('../../../model/users');
var config = require('../../../../config/database');

var roleConfig = require('../../../../config/role-config');
var adminController = require('../super-admin/super-admin-controller');
var branchController = require('../branch-admin/branch-controller');

module.exports.organizationUpdate = function(req,res,next){
  var org_id = req.user.id;
  var branc_id = req.user.branch_id;
  var role = req.user.role;
  req.role = role;
  if(branch_id){
    req.status= 'edit';

    adminController.update(req,res,next);
  }
  else{
    req.status = 'new';
    next();
  }
}

module.exports.branchUpdateRequest = function(req,res,next){
  var branch_id = req.headers.branch_id;
  var role = req.user.role;
  req.role = role;
  if(branch_id){
    req.status= 'edit';
    // return res.json({success:false , msg:"inside branch_id"});
    branchController.branchUpdate(req,res,next);
  }
  else{
    // return res.json({success:false , msg:"inside  else hello branch_id"});
    req.status = 'new';
    next();
  }
}

getToken = function (headers) {
 console.log('inside get token');
  console.log(headers.authorization);
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

//middleware  
module.exports.requireLogin =function(req, res, next){

  var token = getToken(req.headers);
  if(!token){
    res.json({success:false , msg:"no login" });
    //res.redirect("/login");
  }
  else{
    var decoded = jwt.decode(token,config.secretkey);
    var userId = decoded.userid;

    User.findOne({
    _id:userId,
  },function(err, user){
    
    if (!user) {
        return res.status(403).send({success: false,  msg: 'Authentication failed. User not found.'});
      } else {
        // return res.json({something:user , role:user.role});
        req.user = {
            role:user.role ,
            name: user.username , 
            id:user._id,
            status:user.status,
          };
          // return res.json({success:true , user:req.user});
        next();
      }
  });
   
   }

 }

 module.exports.checkSuperAdmin = function(req,res,next){
   if(req.user.role == roleConfig.superAdminRole){
     next();
   }
   else {
    return res.json({success:false , msg:"Not a admin user :) "});
   }
 } 

 module.exports.checkOrgAdmin = function(req,res,next){
   if(req.user.role == roleConfig.orgAdminRole){
     next();
   }
   else {
    return res.json({success:false , msg:"Not a organization admin  user :) "});
   }
 }

 module.exports.checkBranchAdmin = function(req,res,next){
   if(req.user.role == roleConfig.branchAdminRole){
     next();
   }
   else {
    return res.json({success:false , msg:"Not a admin user :) "});
   }
 }

 module.exports.checkCustomer = function(req,res,next){
   if(req.user.role == roleConfig.customerRole){
     next();
   }
   else {
    return res.json({success:false , msg:"Not a admin user :) "});
   }
 }


 
