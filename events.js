var LobbyEvents = require('./events/lobby.js');
var ChatEvents = require('./events/chat.js');
var GameEvents = require('./events/game.js');

module.exports = {
    'lobby' : LobbyEvents,
    'chat' : ChatEvents,
    'game' : GameEvents,
};

