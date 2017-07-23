import fs from 'fs';
import path from 'path';

import React from 'react';
import { StaticRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

import routes from '../../routes';
import { configureStore } from '../../store';


function preload(branch) {
  const store = configureStore();
  let promises = [];
  branch.map(({route}) => {
    if( route.action ) {
      promises.push(store.dispatch(route.action()));
    }
  });
  return new Promise(function(resolve, reject) {
    Promise.all(promises).then(() => {
      resolve(store);
    });
  });
}

function renderHTML(html, scripts, state) {
  let script = '';
  if( state ) {
    script += `<script>window.__PRELOADED_STATE__ = ${serialize(state)};</script>`;
  }
  scripts.map(filename => {
    script += `<script src="${filename}"></script>`;
  });
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


function handler(request, response, config) {
  const branch = matchRoutes(routes, request.url);
  const context={};
  return preload(branch).then(store => {
    const html = renderToString(
      <StaticRouter location={request.url} context={context}>
        <Provider store={store}>
          {renderRoutes(routes)}
        </Provider>
      </StaticRouter>
    );
    const scripts = [
      config.manifest['manifest.js'],
      config.manifest['vendor.js'],
      config.manifest['client.js']
    ];
    response.send(renderHTML(
      html, scripts, store.getState()
    ));
  });
};


function configure(app, config) {
  app.get('*', (request, response) => handler(request, response, config));
}

export default configure;
