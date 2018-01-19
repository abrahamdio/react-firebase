import {combineReducers} from 'redux';
import MainReducer from './mainReducer.js';
import UserReducer from './userReducer.js';

const allReducers = combineReducers({
  data: MainReducer,
  user: UserReducer
});
export default allReducers;
