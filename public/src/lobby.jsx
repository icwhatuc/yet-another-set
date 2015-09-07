var Room = React.createClass({
    render : function() {
        return (
            <li className="room">
                <Link to="game" params={{id: this.props.roomID}}>
                    <div className="room-name">{this.props.roomName}</div>
                    <div className="room-players"># Players: {this.props.connectedPlayers}</div>
                    <div className="room-capacity">Capacity: {this.props.capacity}</div>
                </Link>
            </li>
        );
    },
});

var RoomList = module.exports = React.createClass({
    createRoomEventHandler : function(data) {
        var self = this;
        var cl = self.state.room_list;
        cl.push(data);
        self.setState({room_list : cl});
    },
    getInitialState : function() {
        return {
            room_list : [
                {
                    roomID : 1,
                    roomName: "Room 1",
                    connectedPlayers: 2,
                    capacity: 4
                },
                {
                    roomID : 2,
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
    },
    handleCreateRoom : function(e) {
        e.preventDefault();
        var self = this;
        var room_list = self.state.room_list;
        var roomName = React.findDOMNode(this.refs.roomName).value.trim();
        var roomCapacity = React.findDOMNode(this.refs.roomCapacity).value.trim();
        var newRoom = {
            roomID: room_list.length + 1,
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
                <Room roomID={m.roomID} roomName={m.roomName} 
                 connectedPlayers={m.connectedPlayers}
                 capacity={m.capacity} />
            );
        });
        
        return (
            <div id="lobby">
                <ul className="room-list">
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

