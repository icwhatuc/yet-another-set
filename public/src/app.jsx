global.socket = io();
global.React = require('react');
global.Router = require('react-router');
global.Route = Router.Route;
global.RouteHandler = Router.RouteHandler;
global.Link = Router.Link;
global.Navigation = Router.Navigation;

var Login = require('./login.jsx');
var ChatList = require('./chat.jsx');

var App = React.createClass({
    mixins : [Navigation],
    componentDidMount : function() {
        this.transitionTo('login');
    },
    render : function() {
        return (
            <div id="app">
                <RouteHandler/>
            </div>
        );
    },
});

var Lobby = React.createClass({
    mixins : [Navigation],
    render : function() {
        return (
            <div className="Lobby">
                <div className="game">
                    <Link to="game" params={{id: "1"}}>Game 1</Link>
                </div>
                <div className="game">
                    <Link to="game" params={{id: "2"}}>Game 2</Link>
                </div>
                <div className="game">
                    <Link to="game" params={{id: "3"}}>Game 3</Link>
                </div>
            </div>
        );
    },
});

var Game = ChatList;

var routes = (
    <Route handler={App}>
        <Route name="login" path="login" handler={Login}/>
        <Route name="lobby" path="lobby" handler={Lobby}/>
        <Route name="game" path="games/:id" handler={Game}/>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
