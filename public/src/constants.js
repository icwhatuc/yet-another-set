module.exports = {
    event_constants : {
        // chat
        USER_ENTERS : 'user enters',
        USER_SPEAKS : 'user speaks',
        USER_LEAVES : 'user exits',
        SYSTEM_MESSAGE : 'system msg',
        
        // lobby
        NEW_USER    : 'new user',
        ENTER_LOBBY : 'enter lobby',
        ROOM_CREATED: 'room created',
        ROOM_STARTED: 'room started',
        ROOM_USER_ENTERED: 'room user entered',
        GET_ALL_ROOMS: 'get all rooms',
        
        // game
        USER_ENTERS_GAME : 'user enters game',
        USER_EXITS_GAME : 'user exits game',
        
        USER_SUBMITS_SET : 'user submits set',
        SET_SUBMISSION_RESULT : 'system set resp',

        UPDATE_BOARD : 'update board',
    }
};
