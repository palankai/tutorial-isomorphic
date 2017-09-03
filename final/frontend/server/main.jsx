import path from 'path';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from '../client/routes';


const app = express();

const TEMPLATE_PATH = path.join(process.env.SRC_PATH, 'server', 'templates');
const BUILD_PATH = path.join(process.env.BUILD_PATH, 'build');

app.set('view engine', 'ejs');
app.set('views', TEMPLATE_PATH);

app.use(express.static('public'));
app.use(express.static(BUILD_PATH));

app.get('*', (req, res) => {
  const context = {};
  const HTML = renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
    </StaticRouter>
  );
  const status = context.status || 200;
  res.status(status).render('index', {
    Application: HTML
  });
});


export default app;
