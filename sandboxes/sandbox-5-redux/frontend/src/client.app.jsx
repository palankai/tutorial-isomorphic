import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import routes from './routes';
import reducer from './reducers';

const store = createStore(reducer);

const ClientApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      {renderRoutes(routes)}
    </Provider>
  </BrowserRouter>
);

export default ClientApp;
