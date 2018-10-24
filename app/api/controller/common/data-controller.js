
var Food = require('../../../model/food-schema');


module.exports.getUserDetail = function(req,res,next){
  return res.json({success:true , msg:"token is valid || user info successfully retrieved" , user:req.user});
}
// module.exports.menuList = function(req,res,next){
//   Branch.find({
//     branch_id:req.headers.branch_id,
//    'menus.category._id': req.headers.cat_id, 

//   },function(err, menu){
//     if(err){
//       res.json({success:false , err:err , msg:"error occured"});
//     }
//     if(character){
//       res.json({success:true, character:character});
//     }
//     else {
//       res.json({success:false, msg:"Sorry !! No menu found"});
//     }
//   });

module.exports.foodItem = function(req,res,next){
  Food.find({
    branch_id:req.headers.branch_id,
    _id:req.headers.cat_id,
  }, function(err , food){
    if(err){
      return res.json({success:false , msg:"Error on returning the list of food" , err:err});
    }
    if(food){
      return res.json({success:true ,  msg:"Successfully retrieved organization" , food:food[0]});
    }
    else{
      return res.json({success:false , msg:"Sorry !! food was not found"});
    }
  });

}
