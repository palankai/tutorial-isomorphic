import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './app.jsx';

const Client = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

ReactDOM.render(<Client/>, document.getElementById("app"));
