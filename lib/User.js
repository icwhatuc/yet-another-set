function User(userName)
{
    this._name = userName;
    this._currentGamePoints = 0;
    this._totalPoints = 0;
}

module.exports = User;

User.prototype.name = function() {
    return this._name;
}
