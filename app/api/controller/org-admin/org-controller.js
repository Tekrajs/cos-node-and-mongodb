const jwt = require('jsonwebtoken');
// var Org = require('../../../model/org');
var Branch = require('../../../model/branch');
var config = require('../../../../config/database');
var roleConfig = require('../../../../config/role-config');
var serverConfig = require('../../../../config/server-config');
var valueSetter = require('../common/value-setter');
var AuthenticateController = require('../common/authenticateController');
var PayloadChecker= require('payload-validator');
var validCheckerConfig = require('../../validators/branch-validation');
var mongoose = require('mongoose');


module.exports.branchDelete = function(req,res,next){
  Branch.deleteOne({branch_id: req.headers.branch_id}, function(err) {
    if(err) {
      return res.json({success:false , msg:"Sorry !! error on deleting branch" ,  err:err});
    }
    else {
      console.log("Branch deleted!");
      return res.json({success:true , msg:"Branch Successfully Deleted"});
    }
  });
}


module.exports.branchList = function(req,res,next){
  var orgid ;
  if(req.user.role == roleConfig.superAdminRole){
    orgid  = req.headers.org_id;
  }
  else if (req.user.role == roleConfig.orgAdminRole){
    orgid =req.user.id;
  }
  else {
    return res.json({success:false ,  msg:"Sorry !! not authorized"});
  }
  var branchid = req.headers.branch_id;
  // return res.json({user:req.user , orgid:orgid});
  // return res.json(req.body);
  // var requestChecker =  PayloadChecker.validator(req.body ,validCheckerConfig.branchUpdate.branch_info,validCheckerConfig.branchUpdate.required_field,false);
  // // return res.json(requestChecker);
  // var newBranchValue = valueSetter.newBranch(req.body ,branchid , orgid);
  Branch.find({
  	 organization_id : orgid,
  },function(err,org){
  	if(err){
      return res.json({success:false , err:err , msg:"error on retriving the org"});
    }
    if(org){
      return res.json({success:true  ,org:org, msg:"Successfully!! retreived the branch list"});
    }
    else{
      return res.json({success:false , msg:"Sorry !!! NO branch list found"});
    }
  });
}
