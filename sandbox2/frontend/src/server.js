import fs from 'fs';
import path from 'path';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import App from './app.jsx';

const BUILD_PATH = path.resolve(process.env.BUILD_PATH);
const MANIFEST_PATH = path.resolve(BUILD_PATH, 'manifest.json');
const STATIC_PATH = path.resolve(BUILD_PATH, 'www');

const app = express();

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
app.use(express.static(STATIC_PATH));

app.get('*', (request, response) => {
  console.log(request.url);
  const context={};
  const html = renderToString(
    <StaticRouter location={request.url} context={context} >
      <App/>
    </StaticRouter>
  )
  response.send(renderHTML(
    html, manifest['client.js']
  ));
});

function renderHTML(html, clientFileName) {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Webpack SSR Demo</title>
        <meta charset="utf-8" />
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="${clientFileName}"></script>
      </body>
    </html>`;
}

console.log(process.env);
app.listen(8080, () => console.log('Server running on 8080'));
