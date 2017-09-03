/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';


const Application = () => (
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>
);


ReactDOM.render(<Application />, document.getElementById('application'));
