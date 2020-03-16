import { combineReducers } from 'redux';
import tabReducer from './tabReducer';
import categoryReducer from './categoryReducer';
import contentListReducer from './contentListReducer';
import orderReducer from './orderReducer';
import { connectRouter } from 'connected-react-router';

const mainReducer = (history) => combineReducers({
  router: connectRouter(history),
  tabReducer,
  categoryReducer,
  contentListReducer,
  orderReducer
});

export default mainReducer;