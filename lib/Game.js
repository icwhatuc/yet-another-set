var NOT_STARTED = 0;
var IN_PROGRESS = 1;
var FINISHED    = 2;

var Card = require('./Card.js');

function getInitialDeck()
{
    var deck = [];
    for(var s = 1; s <= 3; s++) // loop through all the shapes
    {
        for(var c = 1; c <= 3; c++) // the colors
        {
            for(var a = 1; a <= 3; a++) // animations 
            {
                for(var n = 1; n <=3; n++)
                {
                    var card = new Card(s, c, a, n);
                    deck.push(card);
                }
            }
        }
    }
    return deck;
}

function Game(id)
{
    this.id = id;
    this.cards = getInitialDeck();
    this.users = [];
    this.state = NOT_STARTED;
}

module.exports = Game;

