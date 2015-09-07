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
    console.log("server room_created_handler");
    var self = this;
    var newGame = data;
    var game = new Game(newGame.roomName, newGame.capacity); // this is not used...
    gm.createGame(newGame.roomName, newGame.capacity);
    roomId++;
    data = { roomID: roomId,
             roomName: newGame.roomName, 
             connectedPlayers: newGame.connectedPlayers,
             capacity: newGame.capacity};
    socket.broadcast.emit(event_constants.ROOM_CREATED, data);
}

LobbyEvents.prototype.get_all_rooms_handler = function(socket, data) {
    var self = this;
    // data is useless; no need to use it
    console.log("server get all rooms handler");
    var data = [];
    console.log(gm._games);
    for (var key in gm._games)
    {
        var game = gm._games[key];
        console.log("GAME");
        console.log(game);
        var room = {
            roomID: 111, // TODO
            roomName: game._id,
            connectedPlayers: 777, // TODO,
            capacity: game._size
        }
        data.push(room);
    }
    /*
    for(var ii=0; ii<gm._games.length; ++ii) {
        var room = {
            roomID: 111,
            roomName: "222", //gm._games[ii]._id,
            connectedPlayers: 777,
            capacity: gm._games[ii]._size
        };
        data.push_back(room);
    }
    */
    console.log("before broadcast");
    console.log(data);
    socket.broadcast.emit(event_constants.GET_ALL_ROOMS, data);
    socket.emit(event_constants.GET_ALL_ROOMS, data);
} 
