/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import routes from './routes';
import initStore from 'store/store';


const store = initStore(window.STATE_FROM_SERVER);


const Application = () => (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);


ReactDOM.render(<Application />, document.getElementById('application'));

if (module.hot) {
  module.hot.accept();
}
