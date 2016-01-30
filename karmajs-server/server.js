var http = require('http'),
    child_process = require('child_process'),
    spawn = child_process.spawn
;

// PROCESS / PORT VALUES
var PORT = process.env.SERVER_PORT || 5000,
    KARMA_PATH = './node_modules/.bin/karma',
    DEFAULT_CONF = '/Users/loren/dev/client/conf/karma.conf.js'
;

var NO_RESULT_MESSAGE = 'No karma process started with this token';

var makeToken = () => Math.random().toString(36).toUpperCase().substr(-8);

// ROUTE REGEX
var RE_START = /^\/start\/?$/,
    RE_RESULT = /^\/result\/(.*)$/
;

var childProcesses = {};

var promiseCache = {};

var server = http.createServer((request, response) => {
  var token;

  var start_match = request.url.match(RE_START);
  var result_match = request.url.match(RE_RESULT);

  if (start_match) {
    console.log(`<karma-server> ${request.url}, starting process`);
    
    var spawnedProcess = spawn(KARMA_PATH, [
      'start',
      DEFAULT_CONF
    ]);

    token = makeToken();

    var promise = new Promise((resolve, reject) => {
      var stdoutStr = '',
          stderrStr = ''
      ;

      spawnedProcess.stdout.on('data', (chunk) => {
        chunk = chunk.toString('utf8');
        stdoutStr += chunk;
      });

      spawnedProcess.stderr.on('data', (chunk) => {
        chunk = chunk.toString('utf8');
        stderrStr += chunk;
      });

      spawnedProcess.on('exit', (error) => {
        resolve(JSON.stringify({
          error: !!error,
          success: !error,
          stdout: stdoutStr,
          stderr: stderrStr
        }));
      });
    });

    promiseCache[token] = promise;

    response.end(token);
  } else if (result_match) {
    token = result_match[1];

    if (promiseCache[token]) {
      promiseCache[token].then((results) => {
        response.end(results);
      });
    } else {
      response.end(NO_RESULT_MESSAGE);
    }
  } else {
    response.end();
  }
});

server.listen(PORT, 'localhost');
