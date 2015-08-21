var express = require('express');
var app = express();
var routes = require('./routes.js');

// register middleware if any

// register routes
for(var route in routes)
{
    var routeObj = routes[route];
    app.get(route, function(req, res) {
        routeObj.handler(req, res);
    });
}

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

