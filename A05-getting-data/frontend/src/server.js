import express from 'express';

const server = express();

server.get('/', (request, response) => {
  response.send('Hello world from Express');
});

server.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});
