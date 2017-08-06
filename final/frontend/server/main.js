import express from 'express';

export default function configure() {
  const app = express();
  app.set('view engine', 'ejs');
  app.set('views', '/usr/src/frontend/server/templates');

  app.get('/', function(req, res) {
      res.render('index');
  });

  return app;
}
