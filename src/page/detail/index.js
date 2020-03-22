import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';

import { Provider } from 'react-redux';
import store, { history } from './store';

import Container from './Main/Container';

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Container />
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root')
);