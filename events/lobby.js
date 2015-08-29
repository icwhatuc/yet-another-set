var event_constants = require('../constants.js').event_constants;
var User = require('../lib/User.js');

function LobbyEvents() {}

module.exports = LobbyEvents;

LobbyEvents.prototype.group_events = function() {
    var self = this;
    var events = {};
    events[event_constants.USER_ENTERS] = self.user_entrance_handler;
    events[event_constants.USER_SPEAKS] = self.user_speech_handler;
    events[event_constants.USER_LEAVES] = self.user_leaves_handler;
    return events;
}

LobbyEvents.prototype.user_entrance_handler = function(socket, data) {
    var self = this;
    var user = new User(data);
    socket.user = user;
    data = { uname: user.name(), type: event_constants.USER_ENTERS };
    socket.broadcast.emit(event_constants.USER_ENTERS, data);
}

LobbyEvents.prototype.user_speech_handler = function(socket, data) {
    var self = this;
    var user = socket.user;
    data = { msg: data, uname: user.name(), type: event_constants.USER_SPEAKS };
    socket.emit(event_constants.USER_SPEAKS, data);
    socket.broadcast.emit(event_constants.USER_SPEAKS, data);
}

LobbyEvents.prototype.user_leaves_handler = function(socket, data) {
    var self = this;
    data = { uname: user.name(), type: event_constants.USER_LEAVES };
    socket.broadcast.emit(event_constants.USER_LEAVES, data);
}

