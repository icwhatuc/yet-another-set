var Game = require('./Game.js');

function Lobby()
{
    this.games = {};
    this.connectedUsers = {};
}

module.exports = Lobby;

Lobby.prototype.createGame = function(gameName) {
    var game = new Game(gameName);
    if(this.games[gameName])
    {
        return false;
    }
    this.games[gameName] = game;
    return true;
}

Lobby.prototype.deleteGame = function(gameName) {
    if(this.games[gameName])
    {
        delete this.games[gameName];
        return true;
    }
    return false;
}

Lobby.prototype.addConnectedUser = function(userName) {
    if(this.connectedUsers[userName])
    {
        return false;
    }
    this.connectedUsers[userName] = userName;
    return true;
}

Lobby.prototype.deleteConnectedUser = function(userName) {
    if(this.connectedUsers[userName])
    {
        delete this.connectedUsers[userName];
        return true;
    }
    return false;
}
