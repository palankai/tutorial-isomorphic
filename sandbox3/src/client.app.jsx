import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './app.jsx';

const ClientApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default ClientApp;
