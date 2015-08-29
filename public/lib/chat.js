(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();
var BUFFER_SIZE = 100;

var Message = React.createClass({displayName: "Message",
    render : function() {
        if(this.props.type === 'user enters')
        {
            return (
                React.createElement("li", {className: "user-enters"}, 
                    React.createElement("span", {className: "uname"}, this.props.uname), " has entered the room."
                )
            );
        }
        
        if(this.props.type === 'user exits')
        {
            return (
                React.createElement("li", {className: "user-exits"}, 
                    React.createElement("span", {className: "uname"}, this.props.uname), " has left the room."
                )
            );
        }

        return (
            React.createElement("li", {className: "chat-msg"}, 
                React.createElement("span", {className: "uname"}, this.props.uname), 
                ": ", this.props.msg
            )
        );
    },
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
        
var ChatList = React.createClass({displayName: "ChatList",
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
        
        socket.emit('user enters', getParameterByName('u'));

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
                React.createElement(Message, {uname: m.uname, msg: m.msg})
            );
        });
        
        return (
            React.createElement("div", {className: "chat"}, 
                React.createElement("ol", null, 
                    chat_list
                ), 
                React.createElement("form", {onSubmit: this.handleChatSubmit}, 
                    React.createElement("input", {ref: "msg", autocomplete: "off", placeholder: "Say something..."})
                )
            )
        );
    }
});

React.render(
    React.createElement(ChatList, null),
    document.getElementById('content')
);


},{}]},{},[1]);
