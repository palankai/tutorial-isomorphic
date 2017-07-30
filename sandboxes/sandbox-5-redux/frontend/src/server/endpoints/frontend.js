import React from 'react';
import { StaticRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

import routes from 'client/routes';
import configureStore from 'store';
import { Injector } from 'lib/inject';

import API from '../api';

const api = new API();


function preload(branch) {
  const store = configureStore();
  const promises = [];
  branch.map(({ route }) => {
    if (route.action) {
      promises.push(store.dispatch(route.action(api)));
    }
    return null;
  });
  return new Promise(((resolve) => {
    Promise.all(promises).then(() => {
      resolve(store);
    });
  }));
}

function renderHTML(html, scripts, styles, state) {
  let script = '';
  let style = '';
  if (state) {
    script += `<script>window.__PRELOADED_STATE__ = ${serialize(state)};</script>`;
  }
  scripts.map((filename) => {
    script += `<script src="${filename}"></script>`;
    return null;
  });
  styles.map((filename) => {
    style += `<link rel="stylesheet" href="${filename}">`;
    return null;
  });
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Title of our awesome ReactJS page</title>
        <meta charset="utf-8" />
        ${style}
      </head>
      <body>
        <div id="app">${html}</div>
        ${script}
      </body>
    </html>`;
}


function handler(request, response, config) {
  const branch = matchRoutes(routes, request.url);
  const context = {};
  return preload(branch).then((store) => {
    const html = renderToString(
      <Injector api={api}>
        <StaticRouter location={request.url} context={context}>
          <Provider store={store}>
            {renderRoutes(routes)}
          </Provider>
        </StaticRouter>
      </Injector>
    );
    const scripts = [
      config.manifest['manifest.js'],
      config.manifest['vendor.js'],
      config.manifest['client.js']
    ];
    const styles = [
      'css/bootstrap.min.css',
      'css/bootstrap-theme.min.css',
      config.manifest['client.css']
    ];
    response.send(renderHTML(
      html, scripts, styles, store.getState()
    ));
  });
}


function configure(app, config) {
  app.get('*', (request, response) => handler(request, response, config));
}

export default configure;
