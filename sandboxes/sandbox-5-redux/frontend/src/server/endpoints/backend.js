const handler = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({
    items: [
      {id: 1,
       content: 'Hello'
      },
      {id: 2,
       content: 'world'
      }
    ]
  }));
};


function configure(app, config) {
  app.get('/api/posts', handler);
}

export default configure;
