import loremIpsum from 'lorem-ipsum';

class Backend {

  getItems() {
    return new Promise((resolve, reject) => {
      resolve({
        items: [
          {
            id: 'ADR-0001',
            title: loremIpsum({count: 3, units: 'words'}),
            excerpt: loremIpsum({count: 1, units: 'paragraph'})
          },
          {
            id: 'ADR-0002',
            title: loremIpsum({count: 3, units: 'words'}),
            excerpt: loremIpsum({count: 1, units: 'paragraph'})
          }
        ]
      });
    });
  }

}

const backend = new Backend();


function configureBackendEndpoints(app) {
  app.get('/api/records/', (req, res) => {
    backend.getItems().then((data) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    });
  });
}

export { backend, configureBackendEndpoints };
