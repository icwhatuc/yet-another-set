var Game = require('./Game.js');
var User = require('./User.js');

function Lobby()
{
    this._games = {};
    this._connectedUsers = {};
}

module.exports = Lobby;

Lobby.prototype.createGame = function(gameName, size) {
    if(this._games[gameName])
    {
        return false;
    }
    this._games[gameName] = new Game(gameName, size);
    return true;
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
