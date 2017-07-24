import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from 'routes';
import reducer from 'store/reducers';
import { Injector } from 'lib/inject';
import API from './api';

// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__;
// eslint-disable-next-line no-underscore-dangle
delete window.__PRELOADED_STATE__;

const store = createStore(
  reducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk))
);

const api = new API();

const ClientApp = () => (
  <Injector api={api}>
    <BrowserRouter>
      <Provider store={store}>
        {renderRoutes(routes)}
      </Provider>
    </BrowserRouter>
  </Injector>
);

export default ClientApp;
