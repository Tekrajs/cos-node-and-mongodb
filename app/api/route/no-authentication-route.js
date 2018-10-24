var publicRoute = require('express').Router();

var branchController = require('../controller/branch-admin/branch-controller');
var dataController = require('../controller/common/data-controller');
// var authenticateController = require('../controller/common/authenticateController');
// var middlewareController = require('../controller/common/middle-ware-controller');


publicRoute.get('/menu' , branchController.allCategoryList);




publicRoute.get('/food' , dataController.foodItem);


module.exports = publicRoute;