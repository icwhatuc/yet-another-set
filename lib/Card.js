// shapes
global.CLUB    = 1;
global.HEART   = 2; // WILL BE DIAMOND!
global.SPADE   = 3;
// var DIAMOND = 1;

// colors
global.BLUE    = 1;
global.RED     = 2;
global.GREEN   = 3;

// animations
global.BOUNCE  = 1; // STRIPE
global.SHAKE   = 2; // EMPTY
global.ROTATE  = 3; // SOLID

function Card(shape, color, animation, number)
{
    this._shape = shape;
    this._color = color;
    this._animation = animation;
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

Card.prototype.animation = function(animation)
{
    if(animation) this._animation = animation;
    return this._animation;
}

Card.prototype.number = function(number)
{
    if(number) this._number = number;
    return this._number;
}

Card.prototype.equals = function(other)
{
    if(other.constructor.name != 'Card')
        return false;
    return (this._shape == other._shape &&
            this._color == other._color &&
            this._number == other._number &&
            this._animation == other._animation);
}

