import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

import App from './app.jsx';

ReactDOM.render(<App/>, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}