import fs from 'fs';
import path from 'path';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';

import routes from './routes';

const BUILD_PATH = path.resolve(process.env.BUILD_PATH);
const MANIFEST_PATH = path.resolve(BUILD_PATH, 'manifest.json');
const STATIC_PATH = path.resolve(BUILD_PATH, 'www');
const RENDER_CLIENT = useEnv('RENDER_CLIENT');
const RENDER_SERVER = useEnv('RENDER_SERVER');

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
  console.log('Client render:', RENDER_CLIENT ? 'yes' : 'no');
  console.log('Server render:', RENDER_SERVER ? 'yes' : 'no');
  manifest = {'client.js': 'build/client.bundle.js'};
  const webpackDevHelper = require('./dev.js');
  webpackDevHelper.useWebpackMiddleware(app);
}

app.get('*', (request, response) => {
  console.log(request.url);
  const context={};
  let html = '';
  if( RENDER_SERVER || isProduction ) {
    html = renderToString(
      <StaticRouter location={request.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    );
  }

  response.send(renderHTML(
    html, RENDER_CLIENT ? manifest['client.js'] : null
  ));
});

function renderHTML(html, clientFileName) {
  let script = '';
  if( clientFileName ) {
    script = `<script src="${clientFileName}"></script>`;
  }
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Title of our awesome ReactJS page</title>
        <meta charset="utf-8" />
      </head>
      <body>
        <div id="app">${html}</div>
        ${script}
      </body>
    </html>`;
}

function useEnv(name, ifNull = true) {
  const value = process.env[name];
  if( value === undefined ) {
    return ifNull;
  }
  return parseInt(value);
}

app.listen(8080, () => console.log('Server running on 8080'));
