var apiRoutes = require('express').Router();
var dataController = require('../controller/common/data-controller');

apiRoutes.get('/info' , dataController.getUserDetail);



module.exports = apiRoutes;