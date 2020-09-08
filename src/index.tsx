import 'antd/dist/antd.css';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import { App } from './app/app';
import { store } from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
