'use strict';
const PORT = process.env.PORT || 8080;

var restify = require('restify');

var server = restify.createServer( {name: 'V-Server'} );
server.use(restify.plugins.queryParser({
  mapParams: true
}));
server.use(restify.plugins.bodyParser({
  mapParams: true
}));

// const express = require('express');
// const app = express();

var ilias = require('./v1/ilias')(server, restify, 'ilias_url');

server.get('/hello/:name', respond);

server.listen(PORT, function () {
  console.log('server listening on port number', PORT);

});

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

// app.get('/', (req, res) => {
//   res.status(200).send('Hello, world!').end();
// });
//
// // Start the server
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
//   console.log('Press Ctrl+C to quit.');
// });
// [END app]
