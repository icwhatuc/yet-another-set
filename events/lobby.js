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
    events[event_constants.GET_ALL_ROOMS]= self.get_all_rooms_handler;
    return events;
}

LobbyEvents.prototype.new_user_handler = function(socket, name) {
    var self = this;
    var user = new User(name);
    gm.addConnectedUser(name);
    socket.user = user;
}

LobbyEvents.prototype.room_created_handler = function(socket, data) {
    var self = this;
    var newGame = data;
    gm.createGame(newGame.roomName, newGame.capacity); // roomId modified in here!
    data = { roomID: roomId,
             roomName: newGame.roomName, 
             connectedPlayers: newGame.connectedPlayers,
             capacity: newGame.capacity};
    socket.broadcast.emit(event_constants.ROOM_CREATED, data);
}

LobbyEvents.prototype.get_all_rooms_handler = function(socket, data) {
    var self = this;
    // data is useless; no need to use it
    var data = [];
    for (var key in gm._games)
    {
        var game = gm._games[key];
        var room = {
            roomID: game._id,
            roomName: key,
            connectedPlayers: 777, // TODO,
            capacity: game._size
        }
        data.push(room);
    }
    socket.broadcast.emit(event_constants.GET_ALL_ROOMS, data);
    socket.emit(event_constants.GET_ALL_ROOMS, data);
} 
