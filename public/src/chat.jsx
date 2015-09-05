var BUFFER_SIZE = 100;

var Message = React.createClass({
    render : function() {
        if(this.props.type === 'user enters')
        {
            return (
                <li className="user-enters">
                    <span className="uname">{this.props.uname}</span> has entered the room.
                </li>
            );
        }
        
        if(this.props.type === 'user exits')
        {
            return (
                <li className="user-exits">
                    <span className="uname">{this.props.uname}</span> has left the room.
                </li>
            );
        }

        return (
            <li className="chat-msg">
                <span className="uname">{this.props.uname}</span>
                : {this.props.msg}
            </li>
        );
    },
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
        
var ChatList = React.createClass({
    genericEventHandler : function(data) {
        var self = this;
        var cl = self.state.chat_list;
        cl.push(data);
        if(cl.size > BUFFER_SIZE) cl.shift();
        self.setState({chat_list : cl});
    },
    getInitialState : function() {
        return {
            chat_list : []
        };
    },
    componentDidMount : function() {
        var self = this;
        
        socket.emit('user enters', this.props.params.id);

        socket.on('user enters', self.genericEventHandler);
        socket.on('user exits', self.genericEventHandler);
        socket.on('user speaks', self.genericEventHandler);
    },
    handleChatSubmit : function(e) {
        e.preventDefault();
        var msg = React.findDOMNode(this.refs.msg).value.trim();
        socket.emit('user speaks', msg);
    },
    render : function() {
        var self = this;
        
        var chat_list = self.state.chat_list.map(function(m) {
            return (
                <Message uname={m.uname} msg={m.msg} />
            );
        });
        
        return (
            <div className="chat">
                <Link to="lobby">Go back to Lobby</Link>
                <ol>
                    {chat_list}
                </ol>
                <form onSubmit={this.handleChatSubmit}>
                    <input ref="msg" autoComplete="off" placeholder="Say something..."/>
                </form>
            </div>
        );
    }
});

module.exports = ChatList;

/*
React.render(
    <ChatList/>,
    document.getElementById('content')
);
*/
