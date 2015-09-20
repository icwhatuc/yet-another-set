var Login = module.exports = React.createClass({
    mixins : [Navigation],
    handleLoginSubmit : function(e) {
        e.preventDefault();
        username = React.findDOMNode(this.refs.uname).value.trim(); // btw, username is global (app.jsx)
        socket.emit('new user', username);
        this.transitionTo('lobby', null, { uname : username });
    },
    render : function() {
        return (
            <div id="login">
                <form className="login-form" onSubmit={this.handleLoginSubmit}>
                    <div className="ui inverted large left icon action input">
                        <i className="user icon"></i>
                        <input type="text" id="uname" ref="uname" autoComplete="off" placeholder="Name"/>
                        <button className="ui vertical animated primary login button">
                            <div className="hidden content">Set!</div>
                            <div className="visible content">
                                <i className="sign in icon"></i>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        );
    },
});

