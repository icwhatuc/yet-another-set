var expect = require('chai').expect;
var Lobby = require('../lib/Lobby.js');

describe('Lobby', function() {
    var lobby = new Lobby();
    describe('constructor', function() {
        it('should create a lobby object', function(done) {
            done();
        });
    });

    describe('create 1 room', function() {
        it('should return true for creating new room', function(done) {
            var canCreate = lobby.createGame("game1");
            expect(canCreate).to.be.true;
            done();
        });
    });
    describe('create dup name room', function() {
        it('should return false for unable to create dup room', function(done) {
            var canCreate = lobby.createGame("game1");
            expect(canCreate).to.be.false;
            done();
        });
    });
    describe('create 2nd room', function() {
        it('should return true for creating new room', function(done) {
            var canCreate = lobby.createGame("game2");
            expect(canCreate).to.be.true;
            done();
        });
    });
    describe('delete 1st room', function() {
        it('should delete 1st room', function(done) {
            var canDelete = lobby.deleteGame("game1");
            expect(canDelete).to.be.true;
            done();
        });
    });
    describe('delete 1st room', function() {
        it('cannot delete 1st room again...', function(done) {
            var canDelete = lobby.deleteGame("game1");
            expect(canDelete).to.be.false;
            done();
        });
    });

    describe('connect 1 user', function() {
        it('should return true for connecting user', function(done) {
            var canCreate = lobby.addConnectedUser("user1");
            expect(canCreate).to.be.true;
            done();
        });
    });
    describe('connect dup user', function() {
        it('should return false for unable to connect dup user', function(done) {
            var canCreate = lobby.addConnectedUser("user1");
            expect(canCreate).to.be.false;
            done();
        });
    });
    describe('create 2nd room', function() {
        it('should return true for connecting 2nd user', function(done) {
            var canCreate = lobby.addConnectedUser("game2");
            expect(canCreate).to.be.true;
            done();
        });
    });
    describe('delete 1st user', function() {
        it('should return true for deleting user', function(done) {
            var canCreate = lobby.deleteConnectedUser("user1");
            expect(canCreate).to.be.true;
            done();
        });
    });
    describe('delete 1st user', function() {
        it('should return false for deleting non-existent user', function(done) {
            var canCreate = lobby.deleteConnectedUser("user1");
            expect(canCreate).to.be.false;
            done();
        });
    });

});
