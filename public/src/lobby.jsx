var socket = io();
var BUFFER_SIZE = 100;

var Room = React.createClass({
    render : function() {
        return (
            <li className="roomInfo">
                <div className="roomInfo">{this.props.roomName}</div>
                <div className="roomConnectedPlayers"># Players: {this.props.connectedPlayers}</div>
                <div className="roomCapacity">Capacity: {this.props.capacity}</div>
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
        
var RoomList = React.createClass({
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
                <Room roomName={m.roomName} 
                 connectedPlayers={m.connectedPlayers}
                 capacity={m.capacity} />
            );
        });
        
        return (
            <div className="content">
                <ul>
                    {room_list}
                </ul>
                <form onSubmit={this.handleCreateRoom}>
                    <input ref="roomName" autocomplete="off" placeholder="Enter room name..."/>
                    <input ref="roomCapacity" autocomplete="off" placeholder="Room capacity"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
});

React.render(
    <RoomList/>,
    document.getElementById('content')
);

