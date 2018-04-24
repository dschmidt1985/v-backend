module.exports = function () {

  var FCM = require('fcm-node');
  var serverKey = 'AAAAtK1GwyE:APA91bE8T0vMwmArnseksGTo35mKp8dOd8IVxiqhVStixFHPQqTe7WcovxBE9A_znseKmvsjcrfnk_U-ieW04zUaNQ1Tq20gCkIgBmHID_gNHLllulJvrajyh2_xqp-3dbpWmRkzBkFb'; //put your server key here
  var fcm = new FCM(serverKey);


  function sendPush(event) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: '/topics/calendar_events',
      collapse_key: 'your_collapse_key',

      notification: {
        title: event.event_title,
        body: event.event_description
      },

      data: {  //you can send only notification or only data(or include both)
        startDate: getDateFromFormattedString(event.event_start),
        endDate: getDateFromFormattedString(event.event_end),
        location: event.event_location
      }
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!", err, response);
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
    console.log("fcm was sent");
  }


  var schedule = require('node-schedule');// https://www.npmjs.com/package/node-schedule
  var AsyncPolling = require('async-polling');// https://www.npmjs.com/package/node-schedule
  var mongoDB = require('../db/mongoInit.js');

  var scheduledJobs = [];

  function schedulePushs() {
    var rePoll = 1000 * 60 * 11; //milliseconds * seconds * minutes

    var calendarPoll = AsyncPolling(function (end) {
      const calendarCollection = mongoDB.get().collection('calendar_events');
      calendarCollection.find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log('schedule push events for these entries: ' + result);
        scheduledJobs.forEach(function (job) {
          job.cancel();
        });
        result.forEach(function (event) {
          var eventDate = getDateFromFormattedString(event.event_start);
          var pushDate = new Date();
          pushDate.setDate(eventDate.getDate() - 1);
          // if (pushDate > new Date()) {
            //push should be send
            pushDate = new Date();
            pushDate.setHours(23, 14, 0, 0);
            scheduledJobs.push(schedule.scheduleJob(pushDate, function () {
              sendPush(event);
            }));
          // }

        });
      });
    }, rePoll);

    calendarPoll.on('error', function (error) {
      // The polling encountered an error, handle it here.

    });
    calendarPoll.on('result', function (result) {
      // The polling yielded some result, process it here.
    });

    calendarPoll.run(); // Let's start polling.

  }

  schedulePushs();

  function getDateFromFormattedString(dateString) {
    var year = dateString.slice(0, 4);
    var month = dateString.slice(4, 6);
    var day = dateString.slice(6, 8);
    var hours = dateString.slice(9, 11);
    var min = dateString.slice(11, 13);
    var sec = dateString.slice(13, 15);
    var isoString = year + '-' + month + '-' + day + 'T' + hours + ':' + min + ':' + sec + '.000Z';

    return new Date(isoString);

  }

};
