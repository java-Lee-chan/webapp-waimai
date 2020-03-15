import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import Container from './Main/Container';

ReactDOM.render(
  (
    <Provider store={store}>
      <Container />
    </Provider>
  ),
  document.getElementById('root')
);