import express from 'express';

const app = express();

app.use(express.static('public'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

