import {} from 'babel-polyfill';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from './routes';
import reducer from './store/reducers';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(
  reducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk))
);

const ClientApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      {renderRoutes(routes)}
    </Provider>
  </BrowserRouter>
);

export default ClientApp;
