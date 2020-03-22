import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import tabReducer from './tabReducer';
import menuReducer from './menuReducer';

const mainReducer = (history) => combineReducers({
  router: connectRouter(history),
  tabReducer,
  menuReducer
});

export default mainReducer;