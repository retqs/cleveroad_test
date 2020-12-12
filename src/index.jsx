import App from './App';
import {GlobalStyles} from './assets/styles';
import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles></GlobalStyles>
    <App />
  </Provider>,
  document.getElementById('root')
);

