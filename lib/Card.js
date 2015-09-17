// shapes
global.CLUB    = 1;
global.DIAMOND = 2;
global.SPADE   = 3;
// var DIAMOND = 1;

// colors
global.BLUE    = 1;
global.RED     = 2;
global.GREEN   = 3;

// fills
global.STRIPED  = 1; // STRIPE
global.EMPTY   = 2; // EMPTY
global.SOLID  = 3; // SOLID

function Card(shape, color, fill, number)
{
    this._shape = shape;
    this._color = color;
    this._fill = fill;
    this._number = number;
}

module.exports = Card;

Card.prototype.shape = function(shape)
{
    if(shape) this._shape = shape;
    return this._shape;
}

Card.prototype.color = function(color)
{
    if(color) this._color = color;
    return this._color;
}

Card.prototype.fill = function(fill)
{
    if(fill) this._fill = fill;
    return this._fill;
}

Card.prototype.number = function(number)
{
    if(number) this._number = number;
    return this._number;
}

// store and get the board index
Card.prototype.index = function(index)
{
    if(index) this._index = index;
    return this._index;
}

Card.prototype.equals = function(other)
{
    if(other.constructor.name != 'Card')
        return false;
    return (this.shape() === other.shape() &&
            this.color() === other.color() &&
            this.number() == other.number() &&
            this.fill() == other.fill());
}

