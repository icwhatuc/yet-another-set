var Login = module.exports = React.createClass({
    mixins : [Navigation],
    handleLoginSubmit : function(e) {
        e.preventDefault();
        var uname = React.findDOMNode(this.refs.uname).value.trim();
        socket.emit('new user', uname);
        this.transitionTo('lobby', null, { uname : uname });
    },
    render : function() {
        return (
            <div id="login">
                <form className="login-form" onSubmit={this.handleLoginSubmit}>
                    <input id="uname" ref="uname" autoComplete="off" placeholder="Enter a nickname"/>
                </form>
            </div>
        );
    },
});
