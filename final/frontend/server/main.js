import path from 'path';

import express from 'express';


const app = express();

const TEMPLATE_PATH = path.join(process.env.SRC_PATH, 'server', 'templates');

app.set('view engine', 'ejs');
app.set('views', TEMPLATE_PATH);

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/submit', (req, res) => {
  res.render('submit');
});


app.get('/view', (req, res) => {
  res.render('view');
});

app.use(express.static('public'));

export default app;
