global.socket = io();
global.React = require('react');
global.Router = require('react-router');
global.Route = Router.Route;
global.RouteHandler = Router.RouteHandler;
global.Link = Router.Link;
global.Navigation = Router.Navigation;

var Login = require('./login.jsx');
var Lobby = require('./lobby.jsx');
var Game = require('./game.jsx');

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
