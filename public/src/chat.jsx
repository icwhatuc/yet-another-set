var BUFFER_SIZE = 100;
var event_constants = require('./constants.js').event_constants;
var date_prettifier = require('pretty-date');

var Message = React.createClass({
    render : function() {
        if(this.props.type === event_constants.USER_ENTERS)
        {
            return (
                <div className="user-enters">
                    <span className="uname">{this.props.uname}</span> has entered the room.
                </div>
            );
        }
        
        if(this.props.type === event_constants.USER_LEAVES)
        {
            return (
                <div className="user-exits">
                    <span className="uname">{this.props.uname}</span> has left the room.
                </div>
            );
        }

        var avatarURL = this.props.uname == 'mihir' ? 
            'https://avatars0.githubusercontent.com/u/4442378?v=3&s=50' :
            'http://api.adorable.io/avatars/50/' + this.props.uname;

        return (
            <div className="comment">
                <a className="avatar"><img src={avatarURL}/></a>
                <div className="content">
                    <a className="author">{this.props.uname}</a>
                    <div className="metadata">
                        <span className="date">{date_prettifier.format(new Date( new Date() - 1*1000 ))}</span>
                    </div>
                    <div className="text">
                        {this.props.msg}
                    </div>
                </div>
            </div>
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
            // chat_list : []
            chat_list : [
            ]
        };
    },
    scrollChat : function() {
        var self = this;
        window.requestAnimationFrame(function() {
            var node = $('.ui.comments')[0];
            node.scrollTop = node.scrollHeight;
        });
    },
    componentDidMount : function() {
        var self = this;
        
        socket.emit(event_constants.USER_ENTERS, this.props.id);

        socket.on(event_constants.USER_ENTERS, self.genericEventHandler);
        socket.on(event_constants.USER_LEAVES, self.genericEventHandler);
        socket.on(event_constants.USER_SPEAKS, self.genericEventHandler);

        self.scrollChat();
    },
    componentDidUpdate : function() {
        var self = this;
        self.scrollChat();
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
            <div className="five wide column">
                <div className="ui comments">
                    {chat_list}
                </div>
                <form onSubmit={this.handleChatSubmit} className="ui large form">
                    <div className="field">
                        <div className="ui inverted left icon input">
                            <i className="comment outline icon"></i>
                            <input ref="msg" type="text" autoComplete="off" placeholder="Say something..."/>
                        </div>
                    </div>
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
