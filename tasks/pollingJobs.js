module.exports = function (server, restify) {
  var AsyncPolling = require('async-polling');// https://www.npmjs.com/package/node-schedule

  var polling = AsyncPolling(function (end) {
      //TODO hier jetzt den api call um unsere db mit aktuellen kalendern zu füttern
      // someAsynchroneProcess(function (error, response) {
      //   if (error) {
      //     // Notify the error:
      //     end(error)
      //     return;
      //   }
      //
      //   // Do something with the result.
      //
      //   // Then send it to the listeners:
      //   end(null, result);
    console.log("polling end");
      end();
      // });
    }, 60000
    )
  ;

  polling.on('error', function (error) {
    // The polling encountered an error, handle it here.
    console.log("dschmidt polling error");

  });
  polling.on('result', function (result) {
    // The polling yielded some result, process it here.
    console.log("dschmidt polling result");
  });

  //TODO comment in if we want to poll for anything
  //polling.run(); // Let's start polling.

}
;