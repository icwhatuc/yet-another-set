var event_constants = require('./constants.js').event_constants;
var ChatList = require('./chat.jsx');
var LOBBY_CHAT_ID = 'lobby';

var Room = React.createClass({
    render : function() {
        var numOfPlayers = parseInt(this.props.connectedPlayers.toString(), 10);
        var roomSize = parseInt(this.props.capacity.toString(), 10);
        var isFull = numOfPlayers >= roomSize;

        var roomInfo = (
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
        );

        roomInfo = isFull ? roomInfo : (
            <Link to="game" params={{id: this.props.roomID}}>
                {roomInfo}
            </Link>
        );

        return (
            <li className="room">
                {roomInfo}
            </li>
        );
    },
});

var RoomList = module.exports = React.createClass({
    mixins : [Navigation],
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
            ]
        };
    },
    roomTransitionHandler : function(roomId) {
        this.transitionTo('game', { id : roomId });
    },
    componentDidMount : function() {
        var self = this;

        socket.on(event_constants.GET_ALL_ROOMS, self.getAllRoomsEventHandler);
        socket.on(event_constants.PERSONAL_ROOM_CREATED, self.roomTransitionHandler);
        
        socket.emit(event_constants.ENTER_LOBBY);
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
    mixins : [Navigation],
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
        var roomCapacity = parseInt(React.findDOMNode(this.refs.roomCapacity).value.trim(), 10);
        var newRoom = {
            roomName: roomName,
            roomDescription: roomDescription,
            connectedPlayers: 1,
            capacity: roomCapacity,
        };
        socket.emit(event_constants.ROOM_CREATED, newRoom);
    },
    handleRoomFormChange: function() {
        var roomName = React.findDOMNode(this.refs.roomName).value.trim();
        var roomDescription = React.findDOMNode(this.refs.roomDescription).value.trim();
        var roomCapacity = parseInt(React.findDOMNode(this.refs.roomCapacity).value.trim(), 10);
        var error;
        
        roomCapacity = isNaN(roomCapacity) ? 4 : roomCapacity;
        
        if(roomName.trim().length == 0)
            error = "A name for your new game room is required.";
        else if(roomCapacity > 8)
            error = "A game room can have a maximum of eight players.";
        if(error)
        {
            $('#new-room-info').text('error');
            // $('#new-room-info').classes('error');
        }
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
                            <p id="new-room-info">Please provide details about the new game room you want to create.</p>
                            <form className="ui large form">
                                <div className="field">
                                    <div className="ui inverted left icon input">
                                        <i className="terminal icon"></i>
                                        <input ref="roomName" type="text" placeholder="Name (required)" onChange={this.handleRoomFormChange}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui inverted left icon input">
                                        <i className="comment outline icon"></i>
                                        <input ref="roomDescription" type="text" placeholder="Description" onChange={this.handleRoomFormChange}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui inverted left icon input">
                                        <i className="users icon"></i>
                                        <input ref="roomCapacity" id="size" type="number" placeholder="# of players" onChange={this.handleRoomFormChange}/>
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
                        <div id="new-room-button" className="ui green ok inverted button">
                            <i className="checkmark icon"></i>
                            Create Room
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

