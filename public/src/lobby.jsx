var event_constants = require('./constants.js').event_constants;
var ChatList = require('./chat.jsx');
var LOBBY_CHAT_ID = 'lobby';

var Room = React.createClass({
    render : function() {
        return (
            <li className="room">
                <Link to="game" params={{id: this.props.roomID}}>
                    <div className="ui grid">
                        <div className="room-name eight wide column">
                            <div className="room-name">
                                <strong>{this.props.roomName}</strong>
                            </div>
                            <div className="room-desc">
                                {this.props.roomDescription}
                            </div>
                        </div>
                        <div className="room-players four wide column">{this.props.connectedPlayers}</div>
                        <div className="room-capacity four wide column">{this.props.capacity}</div>
                    </div>
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
        self.setState({room_list : cl}); // auto calls renders
    },
    getAllRoomsEventHandler : function(data) {
        // get all rooms and put it in the room_list
        var self = this;
        
        self.setState({room_list : data});
    },
    getInitialState : function() {
        return {
            room_list : [
                {roomName: 'a', roomCapacity : 5, roomID: 1000},
            ]
        };
    },
    componentDidMount : function() {
        var self = this;

        socket.on('get all rooms', self.getAllRoomsEventHandler);
        socket.emit('get all rooms', "");
    },
    handleNewRoomModal : function(e) {
        $('.lobby-modal').show();
        $('.ui.basic.modal')
            .modal('show');
        e.preventDefault();
    },
    render : function() {
        var self = this;
        
        var room_list = self.state.room_list.map(function(m) {
            return (
                <Room roomID={m.roomID} roomName={m.roomName} 
                 roomDescription={m.roomDescription} connectedPlayers={m.connectedPlayers}
                 capacity={m.capacity} />
            );
        });

        room_list = self.state.room_list.length > 0 ? (
            <ul className="room-list">
                <li className="room-list-header">
                    <div className="ui grid">
                        <div className="room-name eight wide column"></div>
                        <div className="room-players four wide column"># of players</div>
                        <div className="room-capacity four wide column">Capacity</div>
                    </div>
                </li>
                {room_list}
            </ul>
        ) : (
            <div className="empty-room-list">
                <p>There are currently no available rooms.  Feel free to create one!</p>
            </div>
        );
        
        return (
            <div className="ui segment lobby">
                <div className="ui grid">
                    <div className="eleven wide column">
                        <h3>
                            Game Rooms
                            <button className="ui right floated circular icon button" onClick={this.handleNewRoomModal}>
                                <i className="plus icon"></i>
                            </button>
                        </h3>
                        {room_list}
                    </div>
                    <div className="ui vertical divider">
                        <i className="comments outline icon"></i>
                    </div>
                    <ChatList id={LOBBY_CHAT_ID}/>
                </div>
                <ModalForm/>
            </div>
        );
    }
});

var ModalForm = React.createClass({
    componentDidMount : function() {
        var self = this;
        $('#size').numeric();
        $('.ui.basic.modal').modal({
            detachable : false,
            onApprove : function() {
                self.handleCreateRoom();
            },
        });
    },
    handleCreateRoom : function() {
        var self = this;
        var roomName = React.findDOMNode(this.refs.roomName).value.trim();
        var roomDescription = React.findDOMNode(this.refs.roomDescription).value.trim();
        var roomCapacity = React.findDOMNode(this.refs.roomCapacity).value.trim();
        var newRoom = {
            roomName: roomName,
            roomDescription: roomDescription,
            connectedPlayers: 1,
            capacity: roomCapacity,
        };
        
        console.log(newRoom);

        console.log("Emitting " + event_constants.ROOM_CREATED);
        socket.emit(event_constants.ROOM_CREATED, newRoom);
    },
    render: function() {
        return (
            <div className="lobby-modal" style={{display: "none"}}>
                <div className="ui small basic modal">
                    <div className="ui icon header">
                        <i className="plus square outline icon"></i>
                        Create a New Room
                    </div>
                    <div className="ui middle content">
                        <div className="column">
                            <p>Please provide details about the new game room you want to create.</p>
                            <form className="ui large form">
                                <div className="field">
                                    <div className="ui inverted left icon input">
                                        <i className="terminal icon"></i>
                                        <input ref="roomName" type="text" placeholder="Enter a room name"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui inverted left icon input">
                                        <i className="comment outline icon"></i>
                                        <input ref="roomDescription" type="text" placeholder="Enter a description"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui inverted left icon input">
                                        <i className="users icon"></i>
                                        <input ref="roomCapacity" id="size" type="number" placeholder="# of players"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui red basic cancel inverted button">
                            <i className="remove icon"></i>
                            Cancel
                        </div>
                        <div className="ui green ok inverted button">
                            <i className="checkmark icon"></i>
                            Create Room
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

