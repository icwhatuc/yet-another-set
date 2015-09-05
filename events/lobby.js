var event_constants = require('../constants.js').event_constants;
var User = require('../lib/User.js');
var Lobby = require('../lib/Lobby.js');
var Game = require('../lib/Game.js');

function LobbyEvents() {}

module.exports = LobbyEvents;

LobbyEvents.prototype.group_events = function() {
    var self = this;
    var events = {};
    events[event_constants.NEW_USER] = self.new_user_handler;
    events[event_constants.ROOM_CREATED]= self.room_created_handler;
    return events;
}

LobbyEvents.prototype.new_user_handler = function(socket, name) {
    var self = this;
    var user = new User(name);
    socket.user = user;
}

LobbyEvents.prototype.room_created_handler = function(socket, data) {
    var self = this;
    var newGame = data;
    var game = new Game(newGame.roomName, newGame.capacity);
    data = { roomName: newGame.roomName, 
             connectedPlayers: newGame.connectedPlayers,
             capacity: newGame.capacity};
    socket.broadcast.emit(event_constants.ROOM_CREATED, data);
}

