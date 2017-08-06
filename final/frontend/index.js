import path from 'path';

import configureServer from './server/main';


const BUILD_PATH = path.resolve(process.env.BUILD_PATH);

const config = {
  'build_path': path.resolve(process.env.BUILD_PATH),
  'root_path': __dirname,
  'path': {
    'root': __dirname,
    'templates': path.join(__dirname, 'templates'),
    'build': BUILD_PATH,
    'www': path.join(BUILD_PATH, 'www'),
    'static': path.join(BUILD_PATH, 'www', 'static')
  }
};

configureServer(config).listen(8080, () => {
  console.log('Server started on 8080');
});
