var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var routes = require('./routes.js');
var events = require('./events.js'); // socket events

// register middleware if any

// register routes
for(var route in routes)
{
    var routeObj = routes[route];
    app.get(route, function(req, res) {
        routeObj.handler(req, res);
    });
}

app.use(express.static('public'));

server.listen(2719, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Game app listening at http://%s:%s', host, port);
});

io.on('connection', function(socket) {
    
    for(var event_group in events)
    {
        var evgroupObj = new events[event_group]();
        var group_events = evgroupObj.group_events();
        var geventlist = Object.keys(group_events);

        geventlist.forEach(function(e) {
            socket.on(e, function(data) {
                group_events[e].apply(evgroupObj, [socket, data]);
            });
        });
    }
});

