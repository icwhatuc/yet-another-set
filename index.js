var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var routes = require('./routes.js');
var events = require('./events.js'); // socket events
var Lobby = require('./lib/Lobby.js');

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

server.listen(31415, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Game app listening at http://%s:%s', host, port);
});

global.gm = new Lobby();
global.roomId = 1;

io.on('connection', function(socket) {
    var event_groups = Object.keys(events);

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });

    event_groups.forEach(function(eg) {
        var eg_obj = new events[eg]();
        var event_list = eg_obj.group_events();
        var gevents = Object.keys(event_list);

        gevents.forEach(function(e) {
            socket.on(e, function(data) {
                event_list[e].apply(eg_obj, [socket, data]);
            });
        });
    });
});

