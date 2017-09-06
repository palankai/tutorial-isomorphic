import fs from 'fs';
import path from 'path';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

import routes from '../client/routes';
import webpackDevHelper from './dev';
import initStore from 'store/store';
import { backend, configureBackendEndpoints } from './backend';

const app = express();

const TEMPLATE_PATH = path.join(process.env.SRC_PATH, 'server', 'templates');
const BUILD_PATH = path.join(process.env.BUILD_PATH, 'build');
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

app.set('view engine', 'ejs');
app.set('views', TEMPLATE_PATH);


if (!isProduction && !isTest) {
  webpackDevHelper.useWebpackMiddleware(app);
}

configureBackendEndpoints(app);
app.use(express.static('public'));
app.use(express.static(BUILD_PATH));

function readManifest() {
  if (!isProduction) {
    return {
      'main.js': 'main.bundle.js'
    };
  }
  return JSON.parse(fs.readFileSync(path.join(BUILD_PATH, 'manifest.json'), 'utf8'));
}

function prefetch() {
  const store = initStore();
  return new Promise((resolve, reject) => {
    resolve(store);
  });
}

app.get('*', (req, res) => {
  const context = {};
  const manifest = readManifest();
  const script = manifest['main.js'];

  prefetch().then((store) => {
    const HTML = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );
    const status = context.status || 200;
    res.status(status).render('index', {
      Application: HTML,
      script,
      state: serialize(store.getState())
    });
  });
});


export default app;
