import fire from '../fire';
import shortid from 'shortid';

// FIREBASE STUFF
export function getPlayersThunk() {
  return function (dispatch, getState) {
    const { data } = getState();
    if (!data.roomId) {
      console.log('ERROR: getPlayers() roomId undefined');
      dispatch(getPlayersRejected());
      return;
    }
    dispatch(getPlayersRequested());
    fire.database().ref('/lobby/' + data.roomId).once('value', snap => {
      const players = snap.val();
      console.log('SUCCESS: getPlayers()', players);
      dispatch(getPlayersFulfilled(players));
    })
    .catch(err => {
      console.log('ERROR: getPlayers() firebase error', err);
      dispatch(getPlayersRejected());
    });
  };
}

export function setPlayerThunk(userName, roomId) {
  return function (dispatch, getState) {
    const { data } = getState();
    const targetRoomId = data.roomId || roomId;
    if (!(targetRoomId || userName)) {
      console.log('ERROR: setPlayer() roomId/userName undefined', data);
      dispatch(setPlayerRejected());
      return;
    }
    dispatch(setPlayerRequested(userName));
    fire.database().ref('/lobby/' + targetRoomId).child('players').push().set({
      name: userName
    })
    .then(function() {
      console.log('SUCCESS: setPlayer()', userName);
      dispatch(setPlayerFulfilled());
    })
    .catch(err => {
      console.log('ERROR: setPlayer() firebase error', err);
      dispatch(setPlayerRejected());
    });
  };
}

export function createRoomThunk(userName) {
  return function (dispatch, getState) {
    // TODO: this is bad, figure out how to generate 4-5 unique chars
    const shortId = shortid.generate().substring(0, 5);
    dispatch(createRoomRequested());

    // TODO: figure out firebase's promise
    fire.database().ref('lobby/' + shortId);
    
    dispatch(createRoomFulfilled());
    
    dispatch(joinRoom({ roomId: shortId }));
    dispatch(setPlayerThunk(userName, shortId));
  };
}

export function getPlayersRequested() {
  return {
    type: 'GET_PLAYERS_REQUESTED'
  };
}

export function getPlayersFulfilled(players) {
  return {
    type: 'GET_PLAYERS_FULFILLED',
    payload: players // {{id: 'A', name'dio'}, {id: 'B', name'abe'}}
  };
}

export function getPlayersRejected() {
  return {
    type: 'GET_PLAYERS_REJECTED'
  };
}

export function getPlayersAdded(players) {
  return {
    type: 'GET_PLAYERS_ADDED',
    payload: players
  };
}

export function setPlayerRejected() {
  return {
    type: 'SET_PLAYER_REJECTED'
  };
}

export function setPlayerRequested(userName) {
  return {
    type: 'SET_PLAYER_REQUESTED',
    payload: userName
  };
}

export function setPlayerFulfilled() {
  return {
    type: 'SET_PLAYER_FULFILLED'
  };
}

export function resetRoomInfo() {
  return {
    type: 'RESET_ROOM_INFO'
  };
}
export function joinRoom(roomInfo) {
  return {
    type: 'JOIN_ROOM',
    payload: roomInfo // { roomId: 'XXX' }
  };
}
export function createRoomFulfilled() {
  return {
    type: 'CREATE_ROOM_FULFILLED'
  };
}
export function createRoomRequested() {
  return {
    type: 'CREATE_ROOM_REQUESTED'
  };
}