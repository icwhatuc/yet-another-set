var event_constants = require('../constants.js').event_constants;
var User = require('../lib/User.js');
var Lobby = require('../lib/Lobby.js');
var Game = require('../lib/Game.js');
var Card = require('../lib/Card.js');

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

GameEvents.prototype.user_enters_handler = function(socket, gameId) {
    // data will have the game id
    // add the user to the game
    // notify everyone in the game that the user joined
    // start the game if necessary & let everyone know about he game board
    var game = gm.getGameByID(gameId);

    socket.emit(event_constants.UPDATE_BOARD, game.board());
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
    console.log("set_submission_handler");
    console.log(data);

    var game = gm.getGameByID(data.gameId);

    var set = [];
    for(var ii=0; ii<3; ++ii) {
        var card = new Card(data.selectedCards[ii].color,
                            data.selectedCards[ii].fill,
                            data.selectedCards[ii].shape,
                            data.selectedCards[ii].number)
        set.push(card);
    }

    var isSet = game.isSet(set);
    console.log("Is this a set? " + isSet);

    // TODO - need to get the board set_indices b/c we need to call Game.submitSet!
    socket.emit(event_constants.SET_SUBMISSION_RESULT, false);
    socket.to(data.gameId).emit(event_constants.SET_SUBMISSION_RESULT, false);
}
