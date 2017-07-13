import React from 'react';
import ReactDOM from 'react-dom';

import ClientApp from './client.app.jsx';

ReactDOM.render(<ClientApp/>, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
