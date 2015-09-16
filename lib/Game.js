global.NOT_STARTED = 0;
global.IN_PROGRESS = 1;
global.FINISHED    = 2;

var Card = require('./Card.js');

function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

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

    shuffle(deck);

    return deck;
}

function Game(id, size)
{
    this._id = id;
    this._size = size || 1;
    this._deck = getInitialDeck();
    this._board = [];
    this._users = {};
    this._state = NOT_STARTED;
}

module.exports = Game;

Game.prototype.id = function(id)
{
    if(id) this._id = id;
    return this._id;
}

Game.prototype.size = function(size)
{
    if(size) this._size = size;
    return this._size;
}

Game.prototype.deck = function()
{
    return this._deck;
}

Game.prototype.board = function()
{
    return this._board;
}

Game.prototype.users = function()
{
    var user_arr = [];
    for(var user_name in this._users)
    {
        user_arr.push(this._users[user_name]);
    }
    return user_arr;
}

Game.prototype.addUser = function(user)
{
    this._users[user.name()] = user;
}

Game.prototype.removeUser = function(user)
{
    var user_name;
    if(user.constructor.name == 'User')
        user_name = user.name();
    else
        user_name = user;
    delete this._users[user_name];
}

Game.prototype.updateUserStatus = function(user_name, status)
{
    this._users[user_name].status(status);
}

Game.prototype.isReadyToStart = function()
{
    var self = this;

    if(Object.keys(this._users).length != self.size())
        return false;
    
    for(var uname in self._users)
    {
        if(self._users[uname].status() == NOT_READY)
            return false;
    }

    return true;
}

Game.prototype.isSet = function(set)
{
    // each element of a set is a Card class
    var set_shape_val = 0;
    var set_color_val = 0;
    var set_anima_val = 0;
    var set_numbr_val = 0;

    if(set.length != 3)
        return false;

    for(var k = 0; k < set.length; k++)
    {
        set_shape_val += set[k].shape();
        set_color_val += set[k].color();
        set_anima_val += set[k].animation();
        set_numbr_val += set[k].number();
    }

    return (set_shape_val % 3 == 0 &&
            set_color_val % 3 == 0 &&
            set_anima_val % 3 == 0 &&
            set_numbr_val % 3 == 0);
}

Game.prototype.boardContainsSet = function()
{
    var self = this;
    var cards_on_board = self.board();
    for(var k = 0; k < cards_on_board.length - 2; k++)
    {
        for(var l = k+1; l < cards_on_board.length - 1; l++)
        {
            for(var m = l+1; m < cards_on_board.length; m++)
            {
                var set = [cards_on_board[k], cards_on_board[l], cards_on_board[m]];
                if(self.isSet(set)) return true;
            }
        }
    }
    return false;
}

Game.prototype.initializeBoard = function()
{
    var self = this;
    
    self._board = self._deck.splice(0, 12);
    
    // add more cards until a set is present
    while(!self.boardContainsSet())
    {
        self._board = self._board.concat(self._deck.splice(0, 3));
        console.log(self._board.length);
    }

    // number each card for convenience
    for(var k = 0; k < self._board.length; k++)
    {
        self._board[k]._index = k;
    }
    
    return self.board();
}

Game.prototype.checkSet = function(set_indices)
{
    var self = this;
    var set = [ this._board[set_indices[0]], this._board[set_indices[1]], this._board[set_indices[2]] ];
    return self.isSet(set);
}

Game.prototype.submitSet = function(set_indices)
{
    var self = this;
    
    if(self.checkSet(set_indices))
    {
        for(var k = 0; k < set_indices.length; k++)
        {
            this._board.splice(set_indices[k], 1);
        }

        this._board = this._board.concat(this._deck.splice(0, 3));
        while(!self.boardContainsSet())
        {
            self._board = self._board.concat(self._deck.splice(0, 3));
        }
    }
    else
    {
        return null;
    }
    
    return self.board();
}

