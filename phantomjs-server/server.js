var http = require('http'),
    child_process = require('child_process'),
    spawn = child_process.spawn
;

// PROCESS / PORT VALUES
var PORT = process.env.SERVER_PORT || 5000,
    DEFAULT_KARMA_PORT = 9876,
    DEFAULT_URL = `http://localhost:${DEFAULT_KARMA_PORT}`
;

// ROUTE REGEX
var RE_RENDER_URL = /^\/render-url\/([a-zA-Z\.:\/\-]*)$/
;

var server = http.createServer((req, res) => {
  var render_match = req.url.match(RE_RENDER_URL);

  if (render_match) {
    var spawned_process,
        url = render_match[1] || DEFAULT_URL
    ;
  
    spawned_process = spawn('phantomjs', [
      'render_url.js',
      url
    ]);

    spawned_process.on('exit', res.end);
    return;
  }

  res.end();
});

server.listen(PORT, 'localhost');
