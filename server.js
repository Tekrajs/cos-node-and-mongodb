"use strict";
const express = require('express');
const bodyParser = require('body-parser');
// const port = process.env.PORT || 8080;

const morgan  = require ('morgan');
const jwt	 = require('jsonwebtoken');

const app = express();

const multer = require('multer');
const mime = require('mime');
const crypto =require('crypto');
const mongoose = require('mongoose');



var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/uploads/')
  },
  filename: function(req, file, cb) {
      crypto.pseudoRandomBytes(16, function(err, raw) {
          cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
      });
    }
});

var upload = multer({
  storage: storage
});

var databaseConfig =require('./config/database');
var serverConfig =require('./config/server-config');



app.use(express.static('static'));

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({extended: true}));

//cross orgin
app.use(function (req, res, next) {

// Website you wish to allow to connect
res.header("Access-Control-Allow-Origin", '*');



// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers','*');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
 res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});

app.use('/public', express.static('./public'));

require('./app/api/apiRoute')(app, express ,upload );


const server = app.listen(serverConfig.port,function(){

console.log("There will be dragon in port :" + serverConfig.port);

	mongoose.Promise = require('bluebird');
	mongoose.connect(databaseConfig.database , { useMongoClient: true });
	console.log("connected to the database");
});





