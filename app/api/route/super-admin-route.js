
var adminController = require('../controller/super-admin/super-admin-controller');
var servicesController = require('../controller/super-admin/services-controller');
var middlewareController = require('../controller/common/middle-ware-controller');
var authenticateController = require('../controller/common/authenticateController');

var superAdminRoute = require('express').Router();

console.log(superAdminRoute);
// Define your route herre 


	superAdminRoute.get('/org/list' , adminController.orgList);
    superAdminRoute.post('/org/update', middlewareController.organizationUpdate , authenticateController.register , adminController.orgAdd);
	 superAdminRoute.get('/org/delete' , adminController.orgDelete);
    
    superAdminRoute.get('/service/list' , servicesController.serviceList);
	superAdminRoute.post('/service/save' , servicesController.serviceSave);
	// superAdminRoute.get('/serviceshow/:id' , servicesController.serviceShow);
	// superAdminRoute.post('/serviceedit/:id' , servicesController.serviceEdit);
	superAdminRoute.post('/service/update' , servicesController.serviceUpdate);
	superAdminRoute.get('/service/delete' , servicesController.serviceDelete);

module.exports = superAdminRoute;

