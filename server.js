'use strict';
const PORT = process.env.PORT || 8080;

var restify = require('restify');

var server = restify.createServer({name: 'V-Server'});
server.use(restify.plugins.queryParser({
  mapParams: true
}));
server.use(restify.plugins.bodyParser({
  mapParams: true
}));

// const express = require('express');
// const app = express();

var ilias = require('./v1/ilias')(server, restify, 'ilias_url');


server.get("/", function(req, res, next) {
  res.send("Willkommen bei der API-der Verbundstudium-App. Lade dir doch unsere mobilen Clients herunter!");
  next();
});


server.listen(PORT, function () {
  console.log('server listening on port number', PORT);

});


var scheduleJobs = require('./tasks/scheduleJobs')();
var pollingJobs = require('./tasks/pollingJobs')();