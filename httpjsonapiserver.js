//  ##
//  HTTP JSON API SERVER(Exercise 13 of 13)

//  Write an HTTP server that serves JSON data when it receives a GET request
//  to the path '/api/parsetime'.Expect the request to contain a query string
//  with a key 'iso'
//  and an ISO - format time as the value.

//  For example:

//      /api/parsetime ? iso = 2013 - 08 - 10 T12 : 10: 15.474 Z

//  The JSON response should contain only 'hour', 'minute'
//  and 'second'
//  properties.For example:

//      {
//          "hour": 14,
//          "minute": 23,
//          "second": 15
//      }

//  Add second endpoint
//  for the path '/api/unixtime'
//  which accepts the same
//  query string but returns UNIX epoch time in milliseconds(the number of milliseconds since 1 Jan 1970 00: 00: 00 UTC) under the property 'unixtime'.
//  For example:

//      {
//          "unixtime": 1376136615474
//      }

//  Your server should listen on the port provided by the first argument to
//  your program.

//  ─────────────────────────────────────────────────────────────────────────────

//  ##HINTS

//  The request object from an HTTP server has a url property that you will
//  need to use to "route"
//  your requests
//  for the two endpoints.

//  You can parse the URL and query string using the Node core 'url'
//  module.
//  url.parse(request.url, true) will parse content of request.url and provide
//  you with an object with helpful properties.

//  For example, on the command prompt, type:

//      $ node - pe "require('url').parse('/test?q=1', true)"

//  Documentation on the url module can be found by pointing your browser
//  here:
//      file: ///home/ubuntu/.nvm/versions/node/v4.3.2/lib/node_modules/learnyounod  
//      e / node_apidoc / url.html

//  Your response should be in a JSON string format.Look at JSON.stringify()
//  for more information.

//  You should also be a good web citizen and set the Content - Type properly:

//      res.writeHead(200, {
//          'Content-Type': 'application/json'
//      })

//  The JavaScript Date object can print dates in ISO format, e.g.new
//  Date().toISOString().It can also parse this format
//  if you pass the string
//  into the Date constructor.Date# getTime() will also come in handy.

const http = require('http');
const url = require('url');

var server = http.createServer(function callback(request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var urlObj = url.parse(request.url, true);
    if (urlObj.pathname == "/api/parsetime") {
        var time = urlObj.query.iso;
        var thisDate = new Date(time);
        var dateObj = {
            "hour": thisDate.getHours(),
            "minute": thisDate.getMinutes(),
            "second": thisDate.getSeconds()
        };
        response.end(JSON.stringify(dateObj));
    }
    else if (urlObj.pathname == '/api/unixtime') {
        //console.log(urlObj)
        var time = urlObj.query.iso;
        var thisDate = new Date(time);
        var dateObj = {
            "unixtime": thisDate.getTime()
        };
        response.end(JSON.stringify(dateObj));


    }
    else {
        response.end("suck a fat one");
    }

});
server.listen(process.argv[2]);

// learnyounode suggested solution: 

// var http = require('http')
// var url = require('url')

// function parsetime(time) {
//     return {
//         hour: time.getHours(),
//         minute: time.getMinutes(),
//         second: time.getSeconds()
//     }
// }

// function unixtime(time) {
//     return {
//         unixtime: time.getTime()
//     }
// }

// var server = http.createServer(function(req, res) {
//     var parsedUrl = url.parse(req.url, true)
//     var time = new Date(parsedUrl.query.iso)
//     var result

//     if (/^\/api\/parsetime/.test(req.url))
//         result = parsetime(time)
//     else if (/^\/api\/unixtime/.test(req.url))
//         result = unixtime(time)

//     if (result) {
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         })
//         res.end(JSON.stringify(result))
//     }
//     else {
//         res.writeHead(404)
//         res.end()
//     }
// })
// server.listen(Number(process.argv[2]))