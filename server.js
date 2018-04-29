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


var mongoDB = require('./db/mongoInit.js');
mongoDB.connect(function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1)
  } else {
    initAfterDB();
  }
});

function initAfterDB() {
  var ilias = require('./v1/ilias')(server, restify);
  var mensa = require('./v1/mensa')(server, restify);
  var mensa = require('./v1/calendar')(server, restify);
  var push = require('./push/fcmPush')();


  server.get("/", function(req, res, next) {
    res.send("Willkommen bei der API-der Verbundstudium-App. Lade dir doch unsere mobilen Clients herunter!");
    next();
  });


  server.listen(PORT, function () {
    console.log('server listening on port number', PORT);

  });


}
