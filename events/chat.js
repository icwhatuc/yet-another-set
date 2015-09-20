var event_constants = require('../constants.js').event_constants;
var User = require('../lib/User.js');
var Lobby = require('../lib/Lobby.js');
var Game = require('../lib/Game.js');
var sprintf = require('sprintf-js').sprintf;
var LobbyEvents = require('./lobby.js');
var LobbyEventsObj = new LobbyEvents();

function ChatEvents() {}

module.exports = ChatEvents;

ChatEvents.prototype.group_events = function() {
    var self = this;
    var events = {};
    events[event_constants.USER_ENTERS] = self.user_entrance_handler;
    events[event_constants.USER_SPEAKS] = self.user_speech_handler;
    events[event_constants.USER_LEAVES] = self.user_leaves_handler;
    return events;
}

ChatEvents.prototype.user_entrance_handler = function(socket, room) {
    var self = this;
    var user = socket.user;
    var game = gm.getGameByID(room);
    var data;

    if(!user) return;
    if(user.room()) {
        var oldgame = gm.getGameByID(user.room());
        socket.leave(user.room());
        data = { type : event_constants.SYSTEM_MESSAGE, msg : sprintf("%s left and joined %s", user.name(), room == 'lobby' ? room : game.name()) };
        socket.to(user.room()).emit(event_constants.USER_LEAVES, data);
        if(oldgame) oldgame.removeUser(user);
    }

    if(game) game.addUser(socket.user);
    user.room(room);
    socket.join(room);
    data = { type : event_constants.SYSTEM_MESSAGE, msg : sprintf("%s entered the room", user.name()) };
    socket.to(user.room()).emit(event_constants.USER_ENTERS, data);
    LobbyEventsObj.get_all_rooms_handler(socket);
}

ChatEvents.prototype.user_speech_handler = function(socket, data) {
    var self = this;
    var user = socket.user;
    if(!user) return;
    data = {
        msg: data,
        uname: user.name(),
        type: event_constants.USER_SPEAKS,
        timestamp: new Date()
    };
    socket.emit(event_constants.USER_SPEAKS, data);
    socket.to(user.room()).emit(event_constants.USER_SPEAKS, data);
}

ChatEvents.prototype.user_leaves_handler = function(socket, data) {
    var self = this;
    var user = socket.user;
    if(!user) return;
    data = { uname: user.name(), type: event_constants.USER_LEAVES };
    socket.to(user.room()).emit(event_constants.USER_LEAVES, data);
}

