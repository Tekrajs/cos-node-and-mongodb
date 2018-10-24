var orgmodel = require('../../../model/organization-model');
var valueSetter = require('../common/value-setter');

module.exports.orgList = function(req, res ,next) {

   orgmodel.Organization.find({}).exec(function (err, organizationdata) {
      if (err) {
        // console.log("Error:", err);
        return res.json({success:false , msg:"Error on retriving organization" , err:err});
      }
      if(organizationdata){
        return res.json({success:true, msg:"organization data has been retrieved" , organization:organizationdata});
      }
      else {
        return res.json({success:false , msg:"Sorry no organization was found"});
      }
    });

}

module.exports.orgAdd = function(req, res,next) {
  /*These param will come from api*/
 
  var param = valueSetter.organization_value_setter(req.body , req.org._id);

  var organizations = new orgmodel.Organization(param);

  console.log(organizations);

  // var User = new orgmodel.Users(userinfo);

  organizations.save(function(err){
    if(err){
      console.log(err);

      return res.json({success:false, err:err, msg:"Error on adding organization"});
    } else{
      return res.json({success:true , msg:"Successfully inserted organization"});
    }
  });

}



module.exports.update = function(req, res, next){
  var id = req.headers.org_id;
  var param = valueSetter.organization_value_setter(req.body , id);
  orgmodel.Organization.findOneAndUpdate({
    organization_id: id, 
  },
  { 
    $set:param,
  },
   { new: false },
   function (err, data) {
    if (err) {
      //console.log(err);
      return res.json({success:false ,msg:"Error on editing organization" } )
    }
    if(data){
      return res.json({success:true , msg:"Successfully edited organization" ,org:data});
    }
    else {
      return res.json({success:false , msg:"Sorry !! some error on editing organization"});
    }
  });
}

module.exports.orgDelete = function(req,res,next){
  var id = req.headers.org_id;
  orgmodel.Organization.deleteOne({
    organization_id:id,
  },function(err){
     if(err){
      return res.json({success:false , msg:"Error on deleting org"});
     }
     else {
       return res.json({success:true , msg:"Deleted the organization"});
     }
  });
}



