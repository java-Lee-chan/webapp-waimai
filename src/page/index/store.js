import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import mainReducer from './reducers/main';


// 创建基于 hash 的history
export const history = createHashHistory();

// 创建初始化tab
history.replace('home');

const store = createStore(
  mainReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
)

if (module.hot) {
  module.hot.accept('./reducers/main', () => {
    const nextRootReducer = require('./reducers/main.js').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;