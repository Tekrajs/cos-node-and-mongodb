
var authenticateController = require('./controller/common/authenticateController');
var dataController = require('./controller/common/data-controller');
var middleWareController = require('./controller/common/middle-ware-controller');


var apiRoutes = require('./route/common-route');
var orgAdminRoute = require('./route/org-route');
var branchRoute = require('./route/branch-route');
var superAdminRoute = require('./route/super-admin-route');
var publicRoute = require('./route/no-authentication-route');



module.exports = function(app ,express ,upload){


 
 // For Login
 	app.post('/v1/login' , authenticateController.authenticate);


// Fpr Register 
 	app.post('/v1/register' , authenticateController.register);



 







//  // Route for branch of particular organization
//  require('./route/branch-route')(branchRoute , upload );


//  // common api route can be accessed by logged in user only
//  require('./route/common-route')(apiRoutes , upload );

//  // Guest user can also access these routes
//  require('./route/no-authentication-route')(app , upload );


//  // Only superadmin can access these route
//  require('./route/super-admin-route')(superAdminRoute , upload );

// // Only organization admin can access these route
//  require('./route/org-route')(orgAdminRoute, upload);


 app.use('/public/v1' ,publicRoute );
  app.use('/api/v1', middleWareController.requireLogin, apiRoutes);
 app.use('/branch/v1' , middleWareController.requireLogin , middleWareController.checkBranchAdmin ,
 	upload.single('food'), branchRoute);
  app.use('/org/v1' , middleWareController.requireLogin , middleWareController.checkOrgAdmin , orgAdminRoute);
 app.use('/superadmin/v1' , middleWareController.requireLogin, middleWareController.checkSuperAdmin, superAdminRoute);
 // app.use('/superadmin/v1' , superAdminRoute);

}
