var expect = require('chai').expect;
var Game = require('../lib/Game.js');
var User = require('../lib/User.js');

var CARDS_IN_DECK = 81;

describe('Game', function() {
    var game;
    var game_id = 'test-game';
    var uname = 'new-test-user';

    describe('constructor', function() {
        it('should create a game object', function(done) {
            game = new Game(game_id);
            expect(game.id()).to.equal(game_id);
            done();
        });

        it('should have a valid initial deck', function(done) {
            var deck = game.deck();
            
            expect(deck.length).to.equal(CARDS_IN_DECK);

            for(var k = 0; k < CARDS_IN_DECK - 1; k++)
            {
                for(l = k+1; l < CARDS_IN_DECK; l++)
                {
                    expect(deck[k].equals(deck[l])).to.be.false;
                }
            }

            done();
        });
    });

    describe('addUser', function() {
        it('should add a new user', function(done) {
            var user = new User(uname);
            var game_users;

            game.addUser(user);
            game_users = game.users();
            
            expect(game_users.length).to.equal(1);
            expect(game_users[0].name()).to.equal(uname);
            done();
        });
    });

    describe('removeUser', function() {
        it('should remove the user', function(done) {
            var game_users;

            game.removeUser(uname);
            game_users = game.users();
            
            expect(game_users.length).to.equal(0);
            
            done();
        });
    });
});
