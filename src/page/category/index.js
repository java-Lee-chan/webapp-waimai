import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Container from './Main/Container';
import store from './store';

ReactDOM.render(
  (
    <Provider store={store}>
      <Container />
    </Provider>
  ),
  document.getElementById('root')
);