import fs from 'fs';
import path from 'path';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from './app.jsx';

const BUILD_PATH = path.resolve(process.env.BUILD_PATH);
const MANIFEST_PATH = path.resolve(BUILD_PATH, 'manifest.json');
const STATIC_PATH = path.resolve(BUILD_PATH, 'www');
const RENDER_CLIENT = process.env.RENDER_CLIENT || true;
const RENDER_SERVER = process.env.RENDER_SERVER || true;

const environment = process.env.NODE_ENV || 'development';
const isProduction = environment == 'production';
let manifest = null;

const app = express();

if (isProduction) {
  // PRODUCTION setup
  console.log('Starting server in PRODUCTION mode');
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  app.use(express.static(STATIC_PATH));
} else {
  // DEVELOPMENT setup
  console.log('Starting server in developer mode');
  manifest = {'client.js': 'build/client.bundle.js'};
  const webpackDevHelper = require('./dev.js');
  webpackDevHelper.useWebpackMiddleware(app);
}



app.get('*', (request, response) => {
  console.log(request.url);
  const context={};
  let html = '';
  if( isProduction ) {
    html = renderToString(
      <StaticRouter location={request.url} context={context}>
        <App/>
      </StaticRouter>
    );
  }
  response.send(renderHTML(
    html, manifest['client.js']
  ));
});

function renderHTML(html, clientFileName) {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Title of our awesome ReactJS page</title>
        <meta charset="utf-8" />
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="${clientFileName}"></script>
      </body>
    </html>`;
}

app.listen(8000, () => console.log('Server running on 8000'));
