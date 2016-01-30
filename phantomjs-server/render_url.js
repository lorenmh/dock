var webPage = require('webpage'),
    page = webPage.create(),
    system = require('system')
;

page.settings.webSecurityEnabled = false;
page.windowName = 'phantom-js-window';

var test_url = system.args[1] || 'http://localhost:8000/';

console.log(test_url);

// phantom.onError = function(msg, trace) {
//   var msgStack = ['PHANTOM ERROR: ' + msg];
//   if (trace && trace.length) {
//     msgStack.push('TRACE:');
//     trace.forEach(function(t) {
//       msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
//     });
//   }
//   console.error(msgStack.join('\n'));
// };

page.open(test_url);//, function() {
//  setTimeout(function() {
//    phantom.exit(0);
//  }, 1000);
//});
