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
    var user = socket.user;
    var newGame = data;
    
    console.log("Creating a new room: " + newGame.roomName);

    gm.createGame(newGame.roomName, newGame.roomDescription, newGame.capacity);

    self.get_all_rooms_handler(socket);
}

LobbyEvents.prototype.get_all_rooms_handler = function(socket) {
    var self = this;
    var data = [];
    for (var key in gm._games)
    {
        var game = gm._games[key];
        var room = {
            roomID: game._id,
            roomName: game._name,
            roomDescription: game._desc,
            connectedPlayers: game.userCount(), // TODO,
            capacity: game._size
        }
        data.push(room);
    }
    socket.to('lobby').emit(event_constants.GET_ALL_ROOMS, data);
    socket.emit(event_constants.GET_ALL_ROOMS, data);
} 
