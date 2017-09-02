import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';

import Index from '../client/containers/Index';
import View from '../client/containers/View';
import Submit from '../client/containers/Submit';


const app = express();

const TEMPLATE_PATH = path.join(process.env.SRC_PATH, 'server', 'templates');

app.set('view engine', 'ejs');
app.set('views', TEMPLATE_PATH);

app.get('/', (req, res) => {
  res.render('index', {
    Application: renderToString(<Index />),
  });
});


app.get('/submit', (req, res) => {
  res.render('submit', {
    Application: renderToString(<Submit />),
  });
});


app.get('/view', (req, res) => {
  res.render('view', {
    Application: renderToString(<View />),
  });
});

app.use(express.static('public'));

export default app;
