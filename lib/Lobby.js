var Game = require('./Game.js');
var User = require('./User.js');

function Lobby()
{
    this._games = {};
    this._connectedUsers = {};
    this._idtogame = {};
}

module.exports = Lobby;

Lobby.prototype.createGame = function(gameName, gameDescription, size) {
    console.log("Created game " + gameName + " " + size);
    if(this._games[gameName])
    {
        return false;
    }
    roomId++;
    this._games[gameName] = new Game(roomId, gameName, gameDescription, size);
    this._games[gameName].initializeBoard();

    this._idtogame[roomId] = this._games[gameName];

    return true;
}

Lobby.prototype.getGameByID = function(id) {
    console.log('retrieving instance by id ' + id);
    return this._idtogame[id];
}

Lobby.prototype.deleteGame = function(gameName) {
    if(this._games[gameName])
    {
        delete this._games[gameName];
        return true;
    }
    return false;
}

Lobby.prototype.addConnectedUser = function(userName) {
    console.log("User entered " + userName);
    var user = new User(userName);
    if(this._connectedUsers[userName])
    {
        return false;
    }
    this._connectedUsers[userName] = user;
    return true;
}

Lobby.prototype.deleteConnectedUser = function(userName) {
    if(this._connectedUsers[userName])
    {
        delete this._connectedUsers[userName];
        return true;
    }
    return false;
}
