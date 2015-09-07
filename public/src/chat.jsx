var BUFFER_SIZE = 100;
var event_constants = require('./constants.js').event_constants;

var Message = React.createClass({
    render : function() {
        if(this.props.type === event_constants.USER_ENTERS)
        {
            return (
                <li className="user-enters">
                    <span className="uname">{this.props.uname}</span> has entered the room.
                </li>
            );
        }
        
        if(this.props.type === event_constants.USER_LEAVES)
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
        
        socket.emit(event_constants.USER_ENTERS, this.props.id);

        socket.on(event_constants.USER_ENTERS, self.genericEventHandler);
        socket.on(event_constants.USER_LEAVES, self.genericEventHandler);
        socket.on(event_constants.USER_SPEAKS, self.genericEventHandler);
    },
    handleChatSubmit : function(e) {
        var msg = React.findDOMNode(this.refs.msg).value.trim();
        React.findDOMNode(this.refs.msg).value = '';
        socket.emit('user speaks', msg);
        e.preventDefault();
    },
    render : function() {
        var self = this;
        
        var chat_list = self.state.chat_list.map(function(m) {
            return (
                <Message uname={m.uname} msg={m.msg} type={m.type}/>
            );
        });
        
        return (
            <div className="chat">
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
