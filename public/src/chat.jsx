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
            // chat_list : []
            chat_list : [
                { uname: "longlonglonglongunamecalledsocket", msg: "A Socket is the fundamental class for interacting with browser clients. A Socket belongs to a certain Namespace (by default /) and uses an underlying Client to communicate." },
                { uname: "react", msg: "One of the many great parts of React is how it makes you think about apps as you build them. In this post, I'll walk you through the thought process of building a searchable product data table using React." },
                { uname: "react", msg: 'If you look at ProductTable, you\'ll see that the table header (containing the "Name" and "Price" labels) isn\'t its own component. This is a matter of preference, and there\'s an argument to be made either way. For this example, I left it as part of ProductTable because it is part of rendering the data collection which is ProductTable\'s responsibility. However, if this header grows to be complex (i.e. if we were to add affordances for sorting), it would certainly make sense to make this its own ProductTableHeader component.' },
                { uname: "react", msg: 'If you look at ProductTable, you\'ll see that the table header (containing the "Name" and "Price" labels) isn\'t its own component. This is a matter of preference, and there\'s an argument to be made either way. For this example, I left it as part of ProductTable because it is part of rendering the data collection which is ProductTable\'s responsibility. However, if this header grows to be complex (i.e. if we were to add affordances for sorting), it would certainly make sense to make this its own ProductTableHeader component.' },
                { uname: "react", msg: 'If you look at ProductTable, you\'ll see that the table header (containing the "Name" and "Price" labels) isn\'t its own component. This is a matter of preference, and there\'s an argument to be made either way. For this example, I left it as part of ProductTable because it is part of rendering the data collection which is ProductTable\'s responsibility. However, if this header grows to be complex (i.e. if we were to add affordances for sorting), it would certainly make sense to make this its own ProductTableHeader component.' },
                { uname: "react", msg: 'If you look at ProductTable, you\'ll see that the table header (containing the "Name" and "Price" labels) isn\'t its own component. This is a matter of preference, and there\'s an argument to be made either way. For this example, I left it as part of ProductTable because it is part of rendering the data collection which is ProductTable\'s responsibility. However, if this header grows to be complex (i.e. if we were to add affordances for sorting), it would certainly make sense to make this its own ProductTableHeader component.' },
            ]
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
                <ol className="chat-list">
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
