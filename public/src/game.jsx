var ChatList = require('./chat.jsx');
var CardGallery = require('./card_gallery.jsx');
var event_constants = require('./constants.js').event_constants;

var Game = module.exports = React.createClass({
    mixins : [Navigation],
    componentDidMount: function() {
        var self = this;
        console.log('emitting ' + event_constants.USER_ENTERS_GAME);
        console.log(this.props.params.id);
        socket.emit( event_constants.USER_ENTERS_GAME, this.props.params.id);
    },
    render : function() {
        return (
            <div id="game">
                <Link className="lobby-link" to="lobby">Go back to Lobby</Link>
                <CardGallery id={this.props.params.id}/>
                <ChatList id={this.props.params.id}/>
            </div>
        );
    },
});

