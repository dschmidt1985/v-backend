module.exports = function (server, restify) {

  const clients = require('restify-clients');

  // const ILIAS_URL = 'http://ec2-18-188-33-124.us-east-2.compute.amazonaws.com';
  // const BASE_PATH = '/Customizing/global/plugins/Services/UIComponent/UserInterfaceHook/REST/api.php';

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

  server.get('/v1/schedule', function(req, res, next) {
    var events = {
      plan: 'SS 2018 (Master)',
      events: [
        {
          number: 'P1',
          day: '03.02.2018',
          ort: 'DO',
          meetings: {
            "general":"Klausuren"
          }
        },
        {
          number: 'P2',
          day: '10.02.2018',
          ort: 'GM',
          meetings: {
            "general":"Klausuren"
          }
        },
        {
          number: 'P3',
          day: '17.02.2018',
          ort: 'DO',
          meetings: {
            "general":"Klausuren"
          }
        },
        {
          number: 'T1',
          day: '03.03.2018',
          ort: 'GM',
          meetings: {
            "2. Semester": "Mensch-Computer-Interaktion",
            "4. Semester": "IT-Consulting",
          }
        },
        {
          number: 'T2',
          day: '17.03.2018',
          ort: 'DO',
          meetings: {
            "2. Semester": "IT-Sicherheit (Security- und Risk-Management)",
            "4. Semester": "Fortgeschritene Softwaretechnologie",
          }
        },
        {
          number: 'T3',
          day: '24.03.2018',
          ort: 'GM',
          meetings: {
            "2. Semester": "Mensch-Computer-Interaktion",
            "4. Semester": "IT-Consulting",
          }
        },
        {
          number: 'T4',
          day: '14.04.2018',
          ort: 'DO',
          meetings: {
            "2. Semester": "IT-Sicherheit (Security- und Risk-Management)",
            "4. Semester": "Fortgeschritene Softwaretechnologie",
          }
        },
        {
          number: 'T5',
          day: '21.04.2018',
          ort: 'GM',
          meetings: {
            "2. Semester": "Mensch-Computer-Interaktion",
            "4. Semester": "IT-Consulting",
          }
        },
        {
          number: 'T6',
          day: '05.05.2018',
          ort: 'DO',
          meetings: {
            "2. Semester": "IT-Sicherheit (Security- und Risk-Management)",
            "4. Semester": "Fortgeschritene Softwaretechnologie",
          }
        },
        {
          number: 'T7',
          day: '09.06.2018',
          ort: 'GM',
          meetings: {
            "2. Semester": "Mensch-Computer-Interaktion",
            "4. Semester": "IT-Consulting",
          }
        },
        {
          number: 'T8',
          day: '16.06.2018',
          ort: 'DO',
          meetings: {
            "2. Semester": "IT-Sicherheit (Security- und Risk-Management)",
            "4. Semester": "Fortgeschritene Softwaretechnologie",
          }
        },
        {
          number: 'P4',
          day: '30.06.2018',
          ort: 'GM',
          meetings: {
            "general":"Klausuren"
          }
        },
        {
          number: 'P5',
          day: '07.07.2018',
          ort: 'DO',
          meetings: {
            "general":"Klausuren"
          }
        },
        {
          number: 'P6',
          day: '30.06.2018',
          ort: 'GM',
          meetings: {
            "general":"Klausuren"
          }
        }
      ]
    };
    res.send(events);
    return next();
  });

  server.get('/v1/calendar', function (req, res, next) {
    var events = [
      {
        "_id": {
          "$oid": "5ae5f091e005440010d8a43b"
        },
        "calendar_id": 2,
        "event_id": 1,
        "calendar_title": "Vorlesungstermine",
        "event_title": "Fortgeschrittene Softwareentwicklung",
        "event_description": "",
        "event_location": "FH Dortmund",
        "event_start": "20180414T060000Z",
        "event_end": "20180414T140000Z",
        "event_full_day": false,
        "update_date": {
          "$date": "2018-04-29T16:19:29.763Z"
        }
      },
      {
        "_id": {
          "$oid": "5ae5f091e005440010d8a43d"
        },
        "calendar_id": 1,
        "event_id": 3,
        "calendar_title": "32 \u2013 Fortgeschrittene Softwaretechnologie",
        "event_title": "Deadline M2",
        "event_description": "",
        "event_location": "",
        "event_start": "20180409T000000Z",
        "event_end": "20180409T000000Z",
        "event_full_day": true,
        "update_date": {
          "$date": "2018-04-29T16:19:29.769Z"
        }
      },
      {
        "_id": {
          "$oid": "5ae5f091e005440010d8a43c"
        },
        "calendar_id": 1,
        "event_id": 2,
        "calendar_title": "32 \u2013 Fortgeschrittene Softwaretechnologie",
        "event_title": "Deadline M3",
        "event_description": "Grobentwurf sollte fertig sein",
        "event_location": "",
        "event_start": "20180430T000000Z",
        "event_end": "20180430T000000Z",
        "event_full_day": true,
        "update_date": {
          "$date": "2018-04-29T16:19:29.768Z"
        }
      }];

    res.send(events);

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
