module.exports = function (server, restify) {

  const clients = require('restify-clients');

  const ILIAS_URL = 'http://ec2-18-188-33-124.us-east-2.compute.amazonaws.com';
  const BASE_PATH = '/Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/REST/api.php';


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
    console.log("post token request is called: ");


    login(req.body["username"], req.body["password"],
      function (obj) {
        res.send(obj);
        return next();
      },
      function (error) {
        console.error(error);
        return next(error);
      });
  });


  //TODO make sure that user is logged in, for now we login the user everytime
  function login(username, password, successFun, errorFun) {
    console.log("dschmidt " + username + " passwrod " + password);
    var iliasClient = clients.createJsonClient({
      url: ILIAS_URL
    });

    var options = {
      path: BASE_PATH + '/v2/oauth2/token',
      headers: {
        "Content-Type": "application/json",

      },
    };
    var body = {};
    body['grant_type'] = "password";
    body['api_key'] = "apollon";
    body['username'] = username;
    body['password'] = password;

    console.log("body: " + JSON.stringify(body));

    iliasClient.post(options, body, function (err, req, tokenRes, obj) {
      if (err) {
        console.error(err);
        errorFun(err);
      } else {
        successFun(obj);
      }
    });
  }

  var user = "root";
  var pw = "ilias.test";

  function syncCalendar() {
    login(user, pw,
      function(tokenObj) {
        console.log("login succeed " +JSON.stringify(tokenObj));
      },
      function(err) {
        console.log("login error " +JSON.stringify(err));
    })
    //get all calendars
    //http://ec2-18-188-33-124.us-east-2.compute.amazonaws.com/Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/REST/api.php//v1/umr/calendars

    // {
    //   "2": {
    //   "calendar_id": 2,
    //     "title": "Vorlesungstermine"
    // }
    // }


    // calendar events
    //http://ec2-18-188-33-124.us-east-2.compute.amazonaws.com/Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/REST/api.php//v1/umr/calendar/2/events

    // {
    //   "2": {
    //   "1": {
    //     "event_id": 1,
    //       "calendar_id": 2,
    //       "title": "Fortgeschrittene Softwareentwicklung",
    //       "description": "",
    //       "location": "FH Dortmund",
    //       "start": "20180414T060000Z",
    //       "end": "20180414T140000Z",
    //       "full_day": false
    //   }
    // }
    // }
  }

  // syncCalendar();

};
