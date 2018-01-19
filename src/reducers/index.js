import {combineReducers} from 'redux';
import GitReducer from './gitReducer.js';
import ActiveRepo from './activeReducer.js';
import MenuReducer from './menuReducer.js';
import MainReducer from './mainReducer.js';
import UserReducer from './userReducer.js';

const allReducers = combineReducers({
  repos: GitReducer,
  menus: MenuReducer,
  data: MainReducer,
  activeRepo: ActiveRepo,
  user: UserReducer
});
export default allReducers;
