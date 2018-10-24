/*=============Just for test==============*/

var mongo = require('mongoose');

// var branchSchema = mongo.Schema({
// 	 name: {
// 	     type: String,
// 	},
// 	description:{
// 	    type:String,
// 	},
// 	organizaton_id :[{ type: mongo.Schema.Types.ObjectId, ref: 'Organization' }]
	
// });

// var branch = mongo.model('Branch', branchSchema);

var OrganizationSchemas = new mongo.Schema({
	organization_id:{
		type:mongo.Schema.Types.ObjectId , ref:'users',
	},
	organization_name:{
		type:String, 
		required:true,
	} ,
	organization_address:{
		type:String,
		required:true,
	} , 
	org_contact : [
		{
			type:Number,
		}
	],

	service_taken:[
		{
			 type: mongo.Schema.Types.ObjectId, ref: 'Services' 
		}
	],
	start_date:{type : Date, default: Date.now },  
	expirty_date : {type : Date, default: Date.now} , 
	package_info : {
	   yearly_price:{
	   	type:String,
	   	required:true,
	   }, 
	   monthly_price:{
	   	type:String,
	   	required:true,
	   } , 
	},
	max_no_of_branch:{
		required:true, 
		type:Number,
	},
	updated_at : {type : Date, default: Date.now},
});

// var UserSchema = new mongo.Schema({
// 	name : String,
// 	address: String,
// 	no_of_staff: Number,
// 	service_taken: String,
// 	category : String,
// 	price : Number,
// 	brand : String,
// 	service_taken_date : {type : Date, default: Date.now},
// 	service_expiry_date: {type : Date, default: Date.now},
// 	max_no_of_branch:Number,
// 	username : String,
// 	password : String,
// 	updated_at : {type : Date, default: Date.now},
// });

// var user= mongo.model('User',UserSchema);

var organization = mongo.model('Organization', OrganizationSchemas);

// module.exports = model;
module.exports = {
    Organization: organization,
    // Branch: branch,
    // Users : user
};
