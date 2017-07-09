import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

import config from "../webpack.config.js";
import App from './app.jsx';

const server = express();
const compiler = webpack(config);

server.set('view engine', 'ejs');

server.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

//server.use(express.static('.'));

server.get('*', (request, response) => {
  const context={};
  const html = renderToString(
    <StaticRouter location={request.url} context={context} >
      <App/>
    </StaticRouter>
  )
  response.render('index', { 'html': html });
});

server.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});
