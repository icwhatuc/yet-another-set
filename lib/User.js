global.READY = 1;
global.NOT_READY = 0;
global.ANONYMOUS_COUNTER = 1;

global.getAnonymousName = function()
{
    return ('Anonymous' + ANONYMOUS_COUNTER++);
}

function User(userName)
{
    this._name = userName || getAnonymousName();
    this._currentGamePoints = 0;
    this._totalPoints = 0;
    this._gameStatus = NOT_READY;
}

module.exports = User;

User.prototype.name = function() {
    return this._name;
}

User.prototype.status = function(st) {
    if(st) this._gameStatus = st;
    return this._gameStatus;
}

