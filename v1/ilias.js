const clients = require('restify-clients');

module.exports = function (server, restify) {

  const ILIAS_URL = 'http://ec2-18-188-33-124.us-east-2.compute.amazonaws.com';
  const BASE_PATH = '/Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/REST/api.php';

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

  server.post('/v1/ilias/token', function (req, res, next) {
    var args = getRequestArguments(req);

    var iliasClient = clients.createJsonClient({
      url: ILIAS_URL
    });

    var options = {
      path: BASE_PATH + '/v2/oauth2/token',
      headers: {
        "Content-Type": "application/json",

      },
    };
    console.log("dschmidt: " + req.body);
    req.body['grant_type'] = "password";
    req.body['api_key'] = "apollon";

    iliasClient.post(options, req.body, function (err, req, tokenRes, obj) {
      if (err) {
        console.error(err);
        return next(err);
      } else {
        res.send(obj);
        return next();
      }
    });
  });

};
