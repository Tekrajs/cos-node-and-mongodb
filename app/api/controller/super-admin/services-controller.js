var mongoose = require("mongoose");
var orgmodel = require('../../../model/services-model');
var PayloadChecker= require('payload-validator');
var validCheckerConfig = require('../../validators/services-validation');

var ServicesModel = mongoose.model("Services");

var servicesController = {};

servicesController.serviceList = function(req, res) {
  console.log(req);
  ServicesModel.find({}).exec(function (err, data) {
    if (err) {
      return res.json({success:false , err:err , message:"Error on retriving the services"});
      // console.log("Error:", err);
    }
    if(data){
      return res.json({success:true , services : data});
    }
    else {
      // console.log(data.length);
      return res.json({success:false , msg:"Sorry no services was found"});
    }
  });
};

servicesController.serviceShow = function(req, res) {
 console.log(req);
    ServicesModel.findOne({_id: req.params.id}).exec(function (err, data) {
    if (err) {
      return res.json({success:false , msg:"Error occured on showing services" ,err:err});
      // console.log("Error:", err);
    }
    if(data){
      return res.json({success:true , data:data});
    }
    else {
      res.json({success:false , msg:"Sorry no service detail was found"});
    }
  });
};

servicesController.serviceCreate = function(req, res) {
  res.render("../views/services/create");
};

servicesController.serviceSave = function(req, res) {
  console.log(req.body);
   // var param = { servicename: 'OrchestraClub',
   //               category:'Big',
   //               price:5000,
   //               };

   // return res.json(req.body);
  var requestChecker =  PayloadChecker.validator(req.body ,validCheckerConfig.serviceJson.service_data,validCheckerConfig.serviceJson.required_field,false);
      // return res.json(requestChecker);
      if(requestChecker.success==false){
        return res.json(requestChecker);
      }

      if(requestChecker.success==true){

        var services = new ServicesModel(req.body);

          console.log(services);

          services.save(function(err) {
            if(err) {
              console.log(err);
              return res.json({success:false , msg:"Error on retreiving services" , err:err});
            } else {
                  //   ServicesModel.find({}).exec(function (err, services) {
                  //   if (err) {
                  //     console.log("Error:", err);
                  //   }
                  //   else {
                  //     console.log(services.length);
                  //     res.json({'status' : true,'message':'success',data : services});
                  //   }
                  // });
              return res.json({success:true , msg:"Successfully added service"});
            }
          });
      }
};

servicesController.serviceEdit = function(req, res) {
  ServicesModel.findOne({_id: req.params.id}).exec(function (err, data) {
    if (err) {
      console.log("Error:", err);
      return res.json({success:false , msg:"error on editing services" , })
    }
    else {
      res.json({success:true , msg:"Successfully edited data" ,data: data});
    }
  });
};

servicesController.serviceUpdate = function(req, res) {
  var id = req.headers.id;
  ServicesModel.findByIdAndUpdate(id, {
    $set: {
      servicename: req.body.servicename,
      description: req.body.description,     
    }
  },
    { 
      new: false , 

     },
     function (err, data) {
        if (err) {
          // console.log(err);
          return res.json({success:false , msg:"error on updating service" , err:err});
          // res.render("../views/employees/edit", {employee: req.body});
        }
        // res.redirect("/superadmin/v1/serviceshow/"+data._id);
        if(data){
          return res.json({success:true, msg:"Successfully updated the services" , })

        }
        else {
          return res.json({success:false, msg:"Sorry !! the organization for edit was not found"});
        }
      });
};

servicesController.serviceDelete = function(req, res) {
  var id = req.headers.id;
  ServicesModel.remove({_id: id}, function(err) {
    if(err) {
      //console.log(err);
      return res.json({success:false , msg:"Error on removing service" , err:err});
    }
    else {
      //console.log("Service deleted!");
      return res.json({success:true , msg:"Successfully removed the service"});
    }
  });
};

module.exports = servicesController;
