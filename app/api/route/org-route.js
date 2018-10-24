var  orgAdminRoute = require('express').Router();
var orgController= require('../controller/org-admin/org-controller');
var branchController= require('../controller/branch-admin/branch-controller');
var authenticateController = require('../controller/common/authenticateController');
var middlewareController = require('../controller/common/middle-ware-controller');

//define your route here

orgAdminRoute.post('/branch/update' , middlewareController.branchUpdateRequest,  authenticateController.register,  branchController.branchUpdate);

orgAdminRoute.delete('/branch' , orgController.branchDelete);

orgAdminRoute.get('/branch/list' ,orgController.branchList);

module.exports = orgAdminRoute;
