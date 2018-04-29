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
      };
      return args;
    }
    return null;
  }

  server.get('/v1/mensa/:city/:date', function (req, res, next) {
    console.log(req.params.city);

    var dishes =

      [
        {
          name: 'Menü ',
          description: 'Pizza Salami',
          priceStudent: 6.5,
          priceGuest: 8.5
        },
        {
          name: 'Menü ',
          description: 'Bunter Salat',
          priceStudent: 2.5,
          priceGuest: 4.0
        },
        {
          name: 'Menü ',
          description: 'Frisches Putenschnitzel mit Jägersause und Kartoffelpüree dazu eine Beilage nach Wahl',
          priceStudent: 5.0,
          priceGuest: 7.0
        },
        {
          name: 'Menü ',
          description: 'Nudeln geschwenk in Champingnonrahm mit frisch geriebenen Grana Padona und einer Beilage nach Wahl',
          priceStudent: 3.5,
          priceGuest: 5.5
        },
        {
          name: 'Menü ',
          description: 'Asiatische Bratnudeln',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Asiatische Hähnchennuggets mit Gemüse',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Pikante Hähnchenstücke mit knackigem Gemüse',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Bauerntopf',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Big Kahuna Burger',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Bihun - Suppe',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Blätterteig-Schinken-Käse-Stangen',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Brathähnchen  Oma´s Art',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Brokkoli - Nudel - Auflauf',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Brokkoli - Schinken - Nudeln',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Brunchnudeln mit Tomaten',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Bunte Reispfanne',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Burrito Fiesta',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Champignonrahmschnitzel',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Chicken Nuggets knusprig und zart',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Chili con Carne',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Curryfleisch mit Reis',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Currywurstpfanne',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Döner mit Putenfleisch',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Eingelegte Kartoffeln',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Fritiertes Hähnchen',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Gefüllter Blätterteig',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Gemüsepfanne mit Hähnchen',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Griechische Hähnchenpfanne',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Griechischer Hackauflauf mit Kritharaki - Nudeln',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Gyros in Zwiebel - Sahne - Sauce',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Gyros mit Metaxasauce',
          priceStudent: 3.5,
          priceGuest: 6.0
        },
        {
          name: 'Menü ',
          description: 'Gyros, überbacken mit Metaxa - Sahne - Sauce',
          priceStudent: 3.5,
          priceGuest: 6.0
        }, {
        name: 'Menü ',
        description: 'Hähnchenbrustfilet gebacken',
        priceStudent: 3.5,
        priceGuest: 6.0
      }];

    var firstNumber = Math.floor((Math.random() * dishes.length));
    var secondNumber;
    do {
      secondNumber = Math.floor((Math.random() * dishes.length));
    } while (firstNumber === secondNumber);

    var result = [];
    result.push(dishes[firstNumber]);
    result.push(dishes[secondNumber]);
    result[0].name += '1';
    result[1].name += '2';
    res.send(result);

    return next();
  });


  // server.get('/v1/mensa/gummersbach', function(){
  //   return [
  //     {
  //       name: 'Menü 1',
  //       description: 'Frisches Putenschnitzel mit Jägersause und Kartoffelpüree dazu eine Beilage nach Wahl',
  //       priceStudent: 5.0,
  //       priceGuest: 7.0
  //     },
  //     {
  //       name: 'Menü 2',
  //       description: 'Nudeln geschwenk in Champingnonrahm mit frisch geriebenen Grana Padona und einer Beilage nach Wahl',
  //       priceStudent: 3.5,
  //       priceGuest: 5.5
  //     }
  //   ];
  // });

};
