var defaultState = {
  roomId: '',
  roomStatus: 'INACTIVE', 
  roomPlayers: {}
};
export default function(state = defaultState, action){
  let newState = {};
  switch (action.type) {
    case 'JOIN_ROOM':
      newState = { ...state, roomId: action.payload.roomId, roomStatus: 'PENDING' };
      console.log('JOIN_ROOM', newState);
      return newState;
    case 'RESET_ROOM_INFO':
      console.log('RESET_ROOM_INFO', defaultState);
      return defaultState;
    case 'CREATE_ROOM_FULFILLED':
      newState = { ...state, roomStatus: 'READY' };
      console.log('CREATE_ROOM_FULFILLED', newState);
      return newState;
    case 'CREATE_ROOM_REQUESTED':
      newState = { ...state, roomStatus: 'CREATING_ROOM' };
      console.log('CREATE_ROOM_REQUESTED', newState);
      return newState;
    case 'GET_PLAYERS_REQUESTED':
      newState = { ...state, roomStatus: 'REQUESTED' };
      console.log('GET_PLAYERS_REQUESTED', newState);
      return newState;
    case 'GET_PLAYERS_REJECTED':
      newState = { ...state, roomStatus: 'INACTIVE' };
      console.log('GET_PLAYERS_REJECTED', newState);
      return newState;
    case 'GET_PLAYERS_FULFILLED':
      newState = { ...state, roomPlayers: action.payload, roomStatus: 'READY' };
      console.log('GET_PLAYERS_FULFILLED', newState);
      return newState;
    case 'GET_PLAYERS_ADDED':
      newState = { ...state, roomPlayers: action.payload };
      console.log('GET_PLAYERS_ADDED', newState);
      return newState;
  }
  return state;
}
