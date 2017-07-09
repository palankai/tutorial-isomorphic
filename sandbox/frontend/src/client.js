import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app.jsx';

const Client = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(<Client/>, document.getElementById("app"));
