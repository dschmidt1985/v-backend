module.exports = function (server, restify) {

  const clients = require('restify-clients');

  const ILIAS_URL = 'http://ec2-18-188-33-124.us-east-2.compute.amazonaws.com';
  const BASE_PATH = '/Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/REST/api.php';


  var mongoDB = require('../db/mongoInit.js');


  function getRequestArguments(req) {
    var authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
      var args = {
        headers: {
          'Content-Type': 'application/json',
          'authorization': req.headers['authorization']
        }
      };
      return args;
    }
    return null;
  }


  server.post('/v1/ilias/token', function (req, res, next) {
    console.log('post token request is called: ');


    login(req.body['username'], req.body['password'],
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
    let iliasClient = clients.createJsonClient({
      url: ILIAS_URL
    });

    let options = {
      path: BASE_PATH + '/v2/oauth2/token',
      headers: {
        'Content-Type': 'application/json',

      },
    };
    let body = {};
    body['grant_type'] = 'password';
    body['api_key'] = 'apollon';
    body['username'] = username;
    body['password'] = password;

    console.log('body: ' + JSON.stringify(body));

    iliasClient.post(options, body, function (err, req, tokenRes, obj) {
      if (err) {
        console.error(err);
        errorFun(err);
      } else {
        successFun(obj);
      }
    });
  }

  const user = 'root';
  const pw = 'ilias.test';

  function syncCalendar() {
    login(user, pw,
      function (tokenObj) {
        console.log('login succeed ' + JSON.stringify(tokenObj));

        let iliasClient = clients.createJsonClient({
          url: ILIAS_URL
        });

        let calendarsOption = {
          path: BASE_PATH + '/v1/umr/calendars',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenObj.access_token
          },
        };

        const calendarCollection = mongoDB.get().collection('calendar_events');
        var syncFun = function () {
          iliasClient.get(calendarsOption, function (err, req, tokenRes, calendars) {
            if (err) {
              console.error(err);
            } else {

              Object.keys(calendars).forEach(function (calendarKey) {
                let calendarId = calendars[calendarKey].calendar_id;
                let calendarOption = {
                  path: BASE_PATH + '/v1/umr/calendar/' + calendarId + '/events',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenObj.access_token
                  },
                };

                iliasClient.get(calendarOption, function (err, req, tokenRes, calendarEvents) {
                  if (err) {
                    console.error(err);
                  } else {
                    // console.log('calendar Events: ' + JSON.stringify(calendarEvents));

                    Object.keys(calendarEvents).forEach(function (calendarEventKey) {

                      var calendarEvent = calendarEvents[calendarEventKey];
                      // console.log('calendar Event: ' + JSON.stringify(calendarEvent));
                      Object.keys(calendarEvent).forEach(function (eventKey) {
                        var event = calendarEvent[eventKey];
                        // console.log('calendar single Event: ' + JSON.stringify(event));
                        var calendarEntry = {
                          calendar_id: event.calendar_id,
                          event_id: event.event_id,
                          calendar_title: calendars[calendarKey].title,
                          event_title: event.title,
                          event_description: event.description,
                          event_location: event.location,
                          event_start: event.start,
                          event_end: event.end,
                          event_full_day: event.full_day,
                          update_date: new Date()
                        };
                        console.log('calender entry: ' + JSON.stringify(calendarEntry));
                        calendarCollection.insert(calendarEntry, (err) => {
                          if (err) {
                            throw err;
                          }
                        });
                      });

                    });
                  }
                });
              });


            }
          });

        };

        calendarCollection.drop(function (err, delOK) {
          syncFun();
        });

      },
      function (err) {
        console.log('login error ' + JSON.stringify(err));
      })
  }

  function startCalendarPollingForSync() {
    var AsyncPolling = require('async-polling');// https://www.npmjs.com/package/node-schedule

    var rePoll = 1000 * 60 * 10; //milliseconds * seconds * minutes

    var calendarPolling = AsyncPolling(function (end) {
        console.log("syncing start");
        syncCalendar();
        console.log("syncing end");
        end();
        // });
      }, rePoll
      )
    ;

    calendarPolling.on('error', function (error) {
      // The polling encountered an error, handle it here.

    });
    calendarPolling.on('result', function (result) {
      // The polling yielded some result, process it here.
    });

    calendarPolling.run(); // Let's start polling.
  }

  startCalendarPollingForSync();
};
