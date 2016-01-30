var http = require('http'),
    child_process = require('child_process'),
    spawn = child_process.spawn
;

// PROCESS / PORT VALUES
var PORT = process.env.SERVER_PORT || 5000,
    DEFAULT_CONF = '/Users/loren/dev/client/conf/karma.conf.js'
;

// ROUTE REGEX
var RE_START = /^\/start\/?$/
;

var server = http.createServer((req, res) => {
  var start_match = req.url.match(RE_START);

  if (start_match) {
    var spawned_process = spawn('karma', [
      'start',
      DEFAULT_CONF
    ]);

    spawned_process.on('exit', (error, stdout, stderr) => {
      res.send(JSON.stringify({
        error: !!error,
        success: !error,
        message: error ? stdout : stderr
      }));
    });
    return;
  }

  res.end();
});

server.listen(PORT, 'localhost');
