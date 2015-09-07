var event_constants = require('../constants.js').event_constants;
var User = require('../lib/User.js');
var Lobby = require('../lib/Lobby.js');
var Game = require('../lib/Game.js');

function GameEvents() {}

module.exports = GameEvents;

GameEvents.prototype.group_events = function() {
    var self = this;
    var events = {};
    events[event_constants.USER_ENTERS_GAME] = self.user_enters_handler;
    events[event_constants.USER_EXITS_GAME] = self.user_exits_handler;
    events[event_constants.USER_SUBMITS_SET] = self.set_submission_handler;
    return events;
}

GameEvents.prototype.user_enters_handler = function(socket, data) {
    // data will have the game id
    // add the user to the game
    // notify everyone in the game that the user joined
    // start the game if necessary & let everyone know about he game board
}

GameEvents.prototype.user_exits_handler = function(socket, data) {
    // data will have the game id
    // remove the user from the game
    // if it was the last user to leave the game and the game state is finished, remove the room
    // let the others know that the user left otherwise
}

GameEvents.prototype.set_submission_handler = function(socket, data) {
    // data will contain the game id, the set submitted information
    // check if the set is valid
    // let everyone know about the new board state if necessary
    // or let the user know if it failed
}
