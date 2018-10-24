const jwt = require('jsonwebtoken');
var Branch = require('../../../model/branch');
var Food = require('../../../model/food-schema');
var config = require('../../../../config/database');
var roleConfig = require('../../../../config/role-config');
var serverConfig = require('../../../../config/server-config');
var valueSetter = require('../common/value-setter');
var  AuthenticateController = require('../common/authenticateController');
var PayloadChecker= require('payload-validator');
var fs = require('fs');
var validCheckerConfig = require('../../validators/branch-validation');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


module.exports.deleteCategory = function(req,res,next){
  Food.remove({_id:req.headers.cat_id} , function(err){
    if(err){
      return res.json({success:false , msg:"error on deleting the category" , err:err});
    }
    else {
      return res.json({success:true , msg:"Successfully deleted category"});
    }
  });

}
module.exports.deleteFoodItem = function(req,res,next){
  Food.findOneAndUpdate({
    branch_id:req.user.id,
    "items._id":req.headers.food_id,
  },{
    $pull:{
      items:{
        _id:req.headers.food_id
      }
    }
  },{
    'new':false,
    returnNewDocument:true,
  },function(err, food){
     if(err){
      return res.json({success:false , msg:"error on deleting the food" , err:err});
     }
     // return res.json({success:false , food:food , err:err});
     if(food){
      fs.unlink(req.headers.filepath , function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("file deleted successfully");
        }
        
      });
      return res.json({success:true, msg:"successfully deleted food item" , food:food});
     }
     else{
      return res.json({success:false , msg:"sorry no foood item found"});
     }
  });
}
module.exports.allCategoryList = function(req,res,next){
  var  branchId;
  if(req.user){
    branch_id = req.user.id;
  }
  else{
    branch_id = req.headers.branch_id;
  }
  // return res.json({success:false , msg:"the branch id is" , branch:branch_id});
  Food.find({branch_id: branch_id } , {items:0} , function(err , category){
    if(err){
      return res.json({success:false, err:err , msg:"Error on retrieving category list"});
    }
    if(category){
      return res.json({success:true , msg:"List of category" , category:category});
    }
    else{
      return res.json({success:false , msg:"Sorry no category was found"});
    }
  });
}
module.exports.foodAllList = function(req,res,next){
  Food.aggregate([
  {
    $match:{
      branch_id:req.user.id,
      hasItem:true,
    },
  },
  {
    $unwind:{
      path: '$items',
      preserveNullAndEmptyArrays: false,
    }
  },
  {
    $group:{
      _id:'$branch_id',
      items:{
        $push:{
          name:'$items.name',
          _id:'$items._id',
          description:'$items.description',
          photo:'$items.photo',
          category:'$name',
          price:'$items.price',
          cat_description:'$description',
          cat_id:'$_id'
        }
      }
    }
  },
  ] , function(err,food){
    if(err){
      return res.json({success:false , msg:"Error on retriving food" , err:err});
    }
    if(food[0]['items']){

      return res.json({success:true , msg:"food list" , food:food[0].items , branch_id:food[0]._id});
    }
    else {
      return res.json({success:false , msg:"Sorry no food was found"});
    }
  });
}

module.exports.menuUpdate = function(req,res,next){
  var filename;
  // var filepath;
  if(req.file){
    filename = req.file.destination + req.file.filename;
    var filePath = req.body.url; 
   // return res.json({success:false , msg:"Path check" , body:req.body , filename:req.file});
    fs.unlink(filePath , function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("file deleted successfully");
      }
    });
  }
  else{
    filename = req.body.photo;
  }

  var item = valueSetter.menuSetter(req.body, filename);

  Food.findOneAndUpdate({
    'items._id':req.headers.food_id,
  },{
    $set:{
      'items.$':item,
    }
  },{
    upsert:true , 
    new:false,
  },function(err, food){
    if(err){
      return res.json({success:false , msg:"Error on updating food" , err:err});
    }
    if(food){
      return res.json({success:true, msg:"Successfully updated food" , food:food});
    }
  });
}
module.exports.menuAdd =function(req,res,next){
  // return res.json({success:false  , body:req.body});
  var filename;
  // return res.json({success:false , body:req.body , file:req.file});
  if(req.file){
     filename = req.file.destination + req.file.filename;
  }
  else{
    return res.json({success:false , msg:"Sorry no menu uploaded"});
  }
  
  var item = valueSetter.menuSetter(req.body,filename);
  Food.findOneAndUpdate({
    _id:req.headers.cat_id,
  },{
    $push:{
      items:item,
    },
    $set:{
      hasItem:true,
    }
  }, {
    new:true,
    upsert:true,
  }, function(err , food){
    if(err){
      return res.json({success:false , msg:"Sorry !! error on updating food" , err:err});
    }
    if(food){
      return res.json({success:true , msg:"Food updated !! " , food:food});
    }
    else {
      return res.json({success:false , msg:"Sorry !! something went wrong"});
    } 

  });
  
}

module.exports.categoryUpdate = function(req,res,next){
  var status;
  if(!req.headers.cat_id){
    status = 'new';
  }
  else{
    status='edit';
  }
  // return res.json({success:false , body:req.body});
  var categoryValue = valueSetter.categorySetter(req.body , req.user.id)
  Food.findOneAndUpdate({
    _id:new ObjectId(req.headers.cat_id),
  },{
    
    $set:categoryValue,
  }, {
    upsert:true, 
    new:true,
  }, function(err , food){
    if(err){
      return res.json({success:false , msg:"Sorry !! error on updating food" , err:err});
    }
    if(food){
      return res.json({success:true , msg:"Food updated !! " , food:food});
    }
    else {
      return res.json({success:false , msg:"Sorry !! something went wrong"});
    } 

  });
}


module.exports.branchUpdate = function(req,res,next){
  
  // var branchid = req.headers.branch_id;
  var options ;
  var branch_id;
  var org_id;
  var status;

  if(req.user.role == roleConfig.orgAdminRole){
   
    status = 'org';
    
    if(req.status == 'new'){
      branch_id = req.org._id;
      orgid = req.user.id;
      options = {
        new:true,
        upsert:true,
      };
    }
    else {
      branch_id = req.headers.branch_id;
       options = {
        new:false,
        upsert:false,
      };
    }
    
  }
  else if(req.user.role == roleConfig.branchAdminRole){
    options = {
      new:false,
      upsert:false,
    };
    branch_id = req.user.id;
    orgid = '';
    status = 'branch';
  }
  else {
    return res.json({success:false , msg:"Sorry not a valid user to do this"});
  }
  // return res.json(req.body);
  var requestChecker =  PayloadChecker.validator(req.body ,validCheckerConfig.branchUpdate.branch_info,validCheckerConfig.branchUpdate.required_field,false);
  // return res.json(requestChecker);

   // return res.json({success:false , organization:req.user , status:req.status , org_id:orgid});
  var newBranchValue = valueSetter.branchSetter(req.body);
  var newValueUpdate;
  if(status == 'org' && req.status == 'new'){
    newValueUpdate = {
      branch_info : newBranchValue,
      organization_id : orgid,
    };
  }
  else {
    newValueUpdate = {
      branch_info : newBranchValue,
    };
  }
  Branch.findOneAndUpdate({
  	 branch_id: branch_id,
  } ,
  {
  	$set:newValueUpdate,
  },{
  	upsert:true,
  	new:true,
  },function(err,branch){
  	if(err){
  		return res.json({success:false , msg:"error on adding the branch " , err: err});
  	}
  	if(branch){
      // if(req.header.status == 'new'){
      //     AuthenticateController.register(req , res ,next);
      // }
      // else{
        return res.json({success:true , msg:"Successfully !! Added the branch" , branch:branch});
      // }

  	}
  	else{
  		return res.json({success:false ,msg:"Some error on retrieving branch"});
  	}
  });


}
