global.READY = 1;
global.NOT_READY = 0;

function User(userName)
{
    this._name = userName;
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

