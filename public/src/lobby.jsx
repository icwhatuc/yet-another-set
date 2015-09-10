var ChatList = require('./chat.jsx');
var LOBBY_CHAT_ID = 'lobby';

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
        console.log("createRoomEventHandler");
        console.log(data);
        var self = this;
        var cl = self.state.room_list;
        cl.push(data);
        self.setState({room_list : cl}); // auto calls renders
        console.log("finishcreateRoomEventHandler");
    },
    getAllRoomsEventHandler : function(data) {
        // get all rooms and put it in the room_list
        var self = this;
        console.log("getAllRoomsEventHandler " + data);
        
        self.setState({room_list : data});
    },
    getInitialState : function() {
        console.log("Get initial state called!");
        return {
            room_list : []
        };
    },
    componentDidMount : function() {
        console.log("componentDidMount");
        var self = this;

        socket.on('room created', self.createRoomEventHandler);
        socket.on('get all rooms', self.getAllRoomsEventHandler);
        socket.emit('get all rooms', "");
    },
    handleCreateRoom : function(e) {
        console.log("handleCreateRoom");
        e.preventDefault();
        var self = this;
        var room_list = self.state.room_list;
        var roomName = React.findDOMNode(this.refs.roomName).value.trim();
        var roomCapacity = React.findDOMNode(this.refs.roomCapacity).value.trim();
        var newRoom = {
            roomID: room_list.length + 1, // HACK - needed to keep numbers in sync
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
                <div className="rooms-section">
                    <ul className="room-list">
                        {room_list}
                    </ul>
                    <form onSubmit={this.handleCreateRoom}>
                        <input ref="roomName" autoComplete="off" placeholder="Enter room name..."/>
                        <input ref="roomCapacity" autoComplete="off" placeholder="Room capacity"/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                <ChatList id={LOBBY_CHAT_ID}/>
            </div>
        );
    }
});

