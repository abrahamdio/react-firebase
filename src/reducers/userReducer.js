var defaultState = {
    userName: '',
    userStatus: 'INACTIVE'
};
export default function (state = defaultState, action) {
    let newState = {};
    switch (action.type) {
        case 'SET_USER_NAME':
            newState = { ...state, userName: action.payload };
            console.log('SET_USER_NAME', newState);
            return newState;
        case 'SET_PLAYER_FULFILLED':
            newState = { ...state, userStatus: 'READY'};
            console.log('SET_PLAYER_FULFILLED', newState);
            return newState;
        case 'SET_PLAYER_REQUESTED':
            newState = { ...state, userStatus: 'PENDING', userName: action.payload};
            console.log('SET_PLAYER_REQUESTED', newState);
            return newState;
    }
    return state;
}
