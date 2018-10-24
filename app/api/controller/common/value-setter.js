var roleConfig = require('../../../../config/role-config');

module.exports.menuSetter = function(menuItem , foodLink){
  var menuItem = {
    name:menuItem.name,
    description:menuItem.description,
    photo:foodLink,
    price:menuItem.price,
  }
  return menuItem;

}

module.exports.staffSetter = function(staff){

}

module.exports.categorySetter = function(category , branchId){
  var newCategory;
  // if(status == "new"){
  //   newCategory = {
  //     name:category.name,
  //     description:category.description,
  //     parent:category.parent,
  //     branch_id:branchId,
  //     hasItem:false,
  //   };
  // }
  // else {
    newCategory = {
      name:category.name,
      description:category.description,
      parent:category.parent,
      branch_id:branchId,
      
    
    };
  // }
   
  return newCategory;
	
}

module.exports.organization_value_setter = function(organization , id){
  var param = {
    organization_id:id ,
    organization_name:organization.organization_name ,
    organization_address:organization.organization_address , 
    org_contact : organization.org_contact,
    service_taken : organization.service_taken,

    start_date:organization.start_date, 
    expiry_date :organization.end_date , // depends upon the payment (for more info see below payment collection method)
    package_info : {
       yearly_price: organization.package_info.yearly_price , 
       monthly_price: organization.package_info.monthly_price , 
    },
    max_no_of_branch: organization.max_no_of_branch , 
  };
  return param;


}

module.exports.userValueSetter = function(reqBody, role){
  var newRole;
  if(role == roleConfig.superAdminRole){
      newRole = roleConfig.orgAdminRole;
      // newRole = reqBody.role;
  }
  else if (role == roleConfig.orgAdminRole){
      newRole = roleConfig.branchAdminRole;
  }
  else if(role == roleConfig.branchAdminRole){
      newRole = roleConfig.staffRole;
  }
  else {
    newRole = roleConfig.customerRole;
  }
  console.log("the role is");
  console.log(newRole);
   var newAuth = {
    username:reqBody.username,
    password:reqBody.password,
    email:reqBody.email,
    phone_no:reqBody.phone_no,
    deactivate:false,
    role:newRole,
    last_login:new Date(),
    status:"verified",
   };
   console.log("inside here");
   console.log(newAuth);
   return newAuth;
}

module.exports.branchSetter = function(branch){

	
    var newBranch = {
      name:branch.name,
      address:branch.address,
      state:branch.state,
      postal_code:branch.postal_code,
    };
	return newBranch;
}