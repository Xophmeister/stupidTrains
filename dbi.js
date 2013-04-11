(function() {
  var interface = module.exports = {};

  // Open database
  var sqlite3 = require('sqlite3'),
      db      = new sqlite3.Database('stupidTrains.sqlite', sqlite3.OPEN_READWRITE, function(err) {
                  if (err) {
                    console.error('Error: Cannot open database');
                    process.exit(1);
                  }
                });

  //////////////////////////////////////////////////////////////////////

  // Simple SQL execution
  var simpleSQL = function(name, sql) {
        return function(data, callback) {
          db.run(sql, data, function(err) {
            callback(name + ': ' + (err || 'Completed successfully'));
          });
        };
      },

      simpleMap = {
        log:     { desc: 'Create Journey Log',
                   sql:  'insert into log (stationFrom, stationTo, scheduleT, arriveT, excuse, cancelled) values ($from, $to, strftime(\'%s\', $depart), strftime(\'%s\', $arrive), $excuse, $cancelled)'},
        station: { desc: 'Create Station',
                   sql:  'insert into stations (code, name) values ($code, $name)'}
      };

  for (var i in simpleMap) {
    interface[i] = simpleSQL(simpleMap[i].desc, simpleMap[i].sql);
  };

  //////////////////////////////////////////////////////////////////////

  var todo = function(data, callback) {
    console.log(data);
    callback('Error: Not yet implemented');
  };

  interface.route  = todo;
  interface.origin = todo;
  interface.nuke   = todo;
})();
