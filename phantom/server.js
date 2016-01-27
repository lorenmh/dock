var http = require('http'),
    child_process = require('child_process'),
    spawn = child_process.spawn
;

var PORT = process.env.SERVER_PORT || 5000,
    DEFAULT_KARMA_PORT = 9876,
    DEFAULT_URL = `http://localhost:${DEFAULT_KARMA_PORT}`
;

var server = http.createServer((req, res) => {
  var spawned_process,
      message = req.body ? JSON.parse(req.body) : {},
      test_url = message.url || DEFAULT_URL
  ;

  console.log(test_url);

  spawned_process = spawn('phantomjs', [
    'render_url.js',
    test_url
  ]);

  spawned_process.on('exit', res.end);
});

server.listen(PORT, 'localhost');
