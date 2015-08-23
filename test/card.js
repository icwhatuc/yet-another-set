var expect = require('chai').expect;
var Card = require('../lib/Card.js');

describe('Card', function() {
    var card;
    var extra_card_1;
    var extra_card_2;
    describe('constructor', function() {
        it('should create a card object', function(done) {
            card = new Card(CLUB, BLUE, 2, ROTATE);
            
            expect(card.constructor.name).to.equal('Card');
            expect(card.shape()).to.equal(CLUB);
            expect(card.color()).to.equal(BLUE);
            expect(card.number()).to.equal(2);
            expect(card.animation()).to.equal(ROTATE);
            done();
        });

    });
        
    // no reason to suppor this
    // describe('should change the card properties', function(done) {});

    describe('equals', function() {
        it('should return true for an identical card object', function(done) {
            extra_card_1 = new Card(CLUB, BLUE, 2, ROTATE);
            expect(card.equals(extra_card_1)).to.be.true;
            done();
        });

        it('should return false for an card object that is not identical', function(done) {
            extra_card_2 = new Card(SPADE, BLUE, 3, SHAKE);
            expect(card.equals(extra_card_2)).to.be.false;
            done();
        });

        it('should return false for a non card object', function() {
            expect(card.equals(-1)).to.be.false;
        });
    });
});

