var ChatList = require('./chat.jsx');
var CardGallery = require('./card_gallery.jsx');

var Game = module.exports = React.createClass({
    mixins : [Navigation],
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

