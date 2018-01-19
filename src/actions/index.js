import fire from '../fire';
import shortid from 'shortid';

//Action to get all Repos
export function getRepos(response) {
  return{
    type: 'Get_Repos',
    payload: response
  }
}

export function getMenus(response) {
  console.log('getMenus', response)
  return{
    type: 'Get_Menus',
    payload: response
  }
}

// Thunk function, it calls the getRepos action above after it receives the fetch response.
export function getRepoThunk() {
  return function(dispatch, getState) {
    fetch('https://api.github.com/repositories')
    .then(e => e.json())
      .then(function(response){
        console.log(response);
        var arr = response.slice(0,10);
        dispatch(getRepos(arr))
      })
      .catch((error) => {
        console.error(error,"ERRRRRORRR");
      });
  }
}

export function getMenuThunk() {
  return function(dispatch, getState) {
    const { data } = getState()
    let url = 'http://crimson-voice-2981.getsandbox.com/item/' + data.restaurantId;
    fetch(
      url,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      }
    )
    .then(e => e.json())
      .then(function(response){
        console.log('fetch resp', response);
        var arr = response.menus;
        dispatch(getMenus(arr))
      })
      .catch((error) => {
        console.error(error,"ERRRRRORRR");
      });
  }
}

// Repo selected action
export function repoSelected(repo){
  return{
    type: 'Repo_Selected',
    payload: repo
  }
}

export function restaurantScanned(restaurantInfo) {
  return {
    type: 'RESTAURANT_SCANNED',
    payload: restaurantInfo
  }
}

export function orderStart(orderInfo) {
  return {
    type: 'START_ORDER',
    payload: orderInfo
  }
}

export function addItemQuantity(addItemInfo) {
  return {
    type: 'ADD_ITEM_TO_ORDER',
    payload: addItemInfo
  }
}

export function removeItemQuantity(removeItemInfo) {
  return {
    type: 'REMOVE_ITEM_FROM_ORDER',
    payload: removeItemInfo
  }
}


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