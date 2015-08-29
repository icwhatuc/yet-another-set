(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();
var BUFFER_SIZE = 100;

var Room = React.createClass({displayName: "Room",
    render : function() {
        return (
            React.createElement("li", {className: "roomInfo"}, 
                React.createElement("div", {className: "roomInfo"}, this.props.roomName), 
                React.createElement("div", {className: "roomConnectedPlayers"}, "# Players: ", this.props.connectedPlayers), 
                React.createElement("div", {className: "roomCapacity"}, "Capacity: ", this.props.capacity)
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
        
var RoomList = React.createClass({displayName: "RoomList",
    createRoomEventHandler : function(data) {
        var self = this;
        var cl = self.state.room_list;
        cl.push(data);
        if(cl.size > BUFFER_SIZE) cl.shift();
        self.setState({room_list : cl});
    },
    getInitialState : function() {
        return {
            room_list : [
            {
                roomName: "Room 1",
                connectedPlayers: 2,
                capacity: 4
            },
            {
                roomName: "Room 2",
                connectedPlayers: 3,
                capacity: 8
            }
            ]
        };
    },
    componentDidMount : function() {
        var self = this;

        socket.on('room created', self.createRoomEventHandler);
        /*
        socket.emit('user enters', getParameterByName('u'));

        socket.on('user enters', self.genericEventHandler);
        socket.on('user exits', self.genericEventHandler);
        socket.on('user speaks', self.genericEventHandler);
        */
    },
    handleCreateRoom : function(e) {
        e.preventDefault();
        var self = this;
        var room_list = self.state.room_list;
        var roomName = React.findDOMNode(this.refs.roomName).value.trim();
        var roomCapacity = React.findDOMNode(this.refs.roomCapacity).value.trim();
        var newRoom = 
        {
            roomName: roomName,
            connectedPlayers: 1,
            capacity: roomCapacity,
        };
        room_list.push(newRoom);
        self.setState(
        {
            room_list: room_list
        });
        socket.emit('room created', newRoom);
    },
    render : function() {
        var self = this;
        
        var room_list = self.state.room_list.map(function(m) {
            return (
                React.createElement(Room, {roomName: m.roomName, 
                 connectedPlayers: m.connectedPlayers, 
                 capacity: m.capacity})
            );
        });
        
        return (
            React.createElement("div", {className: "content"}, 
                React.createElement("ul", null, 
                    room_list
                ), 
                React.createElement("form", {onSubmit: this.handleCreateRoom}, 
                    React.createElement("input", {ref: "roomName", autocomplete: "off", placeholder: "Enter room name..."}), 
                    React.createElement("input", {ref: "roomCapacity", autocomplete: "off", placeholder: "Room capacity"}), 
                    React.createElement("input", {type: "submit", value: "Submit"})
                )
            )
        );
    }
});

React.render(
    React.createElement(RoomList, null),
    document.getElementById('content')
);


},{}]},{},[1]);
