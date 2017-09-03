import { API } from './api';


const api = new API();

export function configureBackend(app) {
  app.get('/api/records/', (req, res) => {
    api.getADREntries().then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    });
  });
};
