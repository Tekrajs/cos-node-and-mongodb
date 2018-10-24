
var branchController = require('../controller/branch-admin/branch-controller');
var authenticateController = require('../controller/common/authenticateController');
var middlewareController = require('../controller/common/middle-ware-controller');
var branchRoute = require('express').Router();


// Define your route here

branchRoute.post('/category/update' , branchController.categoryUpdate);
branchRoute.post('/menu/add' , branchController.menuAdd);
branchRoute.post('/menu/update' , branchController.menuUpdate);
branchRoute.get('/food/all' , branchController.foodAllList);
branchRoute.get('/category/all' , branchController.allCategoryList);
branchRoute.delete('/food' , branchController.deleteFoodItem);
branchRoute.delete('/category' , branchController.deleteCategory);


branchRoute.post('/branch/update'  , branchController.branchUpdate);

module.exports = branchRoute;
