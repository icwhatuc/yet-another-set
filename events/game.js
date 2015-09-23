var event_constants = require('../constants.js').event_constants;
var User = require('../lib/User.js');
var Lobby = require('../lib/Lobby.js');
var Game = require('../lib/Game.js');
var Card = require('../lib/Card.js');
var LobbyEvents = require('./lobby.js');
var LobbyEventsObj = new LobbyEvents();
var sprintf = require('sprintf-js').sprintf;

function GameEvents() {}

module.exports = GameEvents;

GameEvents.prototype.group_events = function() {
    var self = this;
    var events = {};
    events[event_constants.USER_ENTERS_GAME] = self.user_enters_handler;
    events[event_constants.USER_SUBMITS_SET] = self.set_submission_handler;
    return events;
}

GameEvents.prototype.user_enters_handler = function(socket, gameId) {
    var user = socket.user;
    var game = gm.getGameByID(gameId);
    // add the user to the game
    game.addUser(socket.user);
    // notify everyone in the lobby that the user left and entered a game
    // LobbyEventsObj.get_all_rooms_handler(socket);
    
    // start the game if necessary & let everyone know about he game board
    var game = gm.getGameByID(gameId);
    
    if(!user) return;

    // leave lobby
    socket.leave('lobby');
    
    // notify the lobby that the user joined this game
    socket.to('lobby').emit(event_constants.USER_LEAVES, { type : event_constants.SYSTEM_MESSAGE, msg : sprintf("%s left and joined \"%s\".", user.name(), game._name) });

    game.addUser(user);
    user.room(gameId);
    socket.join(gameId);

    LobbyEventsObj.get_all_rooms_handler(socket);
    socket.emit(event_constants.UPDATE_BOARD, game.board());
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

    var checkSet = game.checkSet(data.indices);

    console.log("Actual check set " + checkSet);

    game.submitSet(data.indices);

    console.log("GAMEID", data.gameId);

    if(checkSet)
    {
        game.addPoint(socket.user);
    }
    game.printPoints();

    // TODO - need to get the board set_indices b/c we need to call Game.submitSet!
    socket.emit(event_constants.SET_SUBMISSION_RESULT, checkSet);
    socket.to(data.gameId).emit(event_constants.SET_SUBMISSION_RESULT, checkSet);
    socket.emit(event_constants.UPDATE_BOARD, game.board());
    socket.to(data.gameId).emit(event_constants.UPDATE_BOARD, game.board());
}
