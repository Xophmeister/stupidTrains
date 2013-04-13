// Very simple user IO interface 
(function() {
  var rl = require('readline');

  module.exports = function(question, expected, callback) {
    var io     = rl.createInterface(process.stdin, process.stdout);
        answer = null;

    // expected can be an array of strings (case insensitive), where the
    // first element is the default, or a regular expression
    if (!(Array.isArray(expected) && expected.length) && !(expected instanceof RegExp)) {
      throw new RangeError('Manage your expectations!');
    }

    // Set prompt
    if (expected.length) {
      expected = expected.map(function(a) { return a.toLowerCase(); });
      question += ' [' + [expected[0].toUpperCase()].concat(expected.slice(1)).join('/') + '] ';
    } else {
      question += ' ';
    }
    io.setPrompt(question);

    io.prompt();
    
    io.on('SIGINT', function() {
      // Terminate on ^C
      process.exit(0);

    }).on('line', function(line) {
      // Default to first option if nothing entered
      if (expected.length) {
        if (!line.length) { 
          answer = expected[0];
        } else if (expected.indexOf(line.toLowerCase()) != -1) {
          answer = line.toLowerCase();
        }
      } else {
        if (expected.test(line)) {
          answer = line;
        }
      }

      if (answer) {
        io.close();
      } else {
        io.prompt();
      }

    }).on('close', function() { callback(answer); });
  };
})();
