import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Main from './Main/Main';

ReactDOM.render(
  (
    <Provider>
      <Main />
    </Provider>
  ),
  document.getElementById('root')
);