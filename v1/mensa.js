
module.exports = function (server, restify) {

  const clients = require('restify-clients');

  // const ILIAS_URL = 'http://ec2-18-188-33-124.us-east-2.compute.amazonaws.com';
  // const BASE_PATH = '/Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/REST/api.php';

  var tradingProductsById = {};

  function getRequestArguments(req) {
    var authorizationHeader = req.headers["authorization"];
    if (authorizationHeader) {
      var args = {
        headers: {
          "Content-Type": "application/json",
          "authorization": req.headers["authorization"]
        }
      }
      return args;
    }
    return null;
  }

  server.get('/v1/mensa/dortmund', function(){
    return [
      {
        name: 'Menü 1',
        description: 'Pizza Hawai',
        priceStudent: 6.5,
        priceGuest: 8.5
      },
      {
        name: 'Menü 2',
        description: 'Bunter Salat',
        priceStudent: 2.5,
        priceGuest: 4.0
      }
    ];
  }) ;

  server.get('/v1/mensa/gummersbach', function(){
    return [
      {
        name: 'Menü 1',
        description: 'Frisches Putenschnitzel mit Jägersause und Kartoffelpüree dazu eine Beilage nach Wahl',
        priceStudent: 5.0,
        priceGuest: 7.0
      },
      {
        name: 'Menü 2',
        description: 'Nudeln geschwenk in Champingnonrahm mit frisch geriebenen Grana Padona und einer Beilage nach Wahl',
        priceStudent: 3.5,
        priceGuest: 5.5
      }
    ];
  });

};
