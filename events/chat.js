var event_constants = require('../constants.js').event_constants;
var User = require('../lib/User.js');
var Lobby = require('../lib/Lobby.js');
var Game = require('../lib/Game.js');

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
    if(!user) return;
    user.room(room);
    socket.join(room);
    data = { uname: user.name(), type: event_constants.USER_ENTERS };
    socket.to(user.room()).emit(event_constants.USER_ENTERS, data);
}

ChatEvents.prototype.user_speech_handler = function(socket, data) {
    var self = this;
    var user = socket.user;
    if(!user) return;
    data = { msg: data, uname: user.name(), type: event_constants.USER_SPEAKS };
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

