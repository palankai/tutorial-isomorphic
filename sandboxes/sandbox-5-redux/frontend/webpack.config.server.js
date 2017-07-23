var path = require('path');
var webpack = require('webpack');
var commonConfig = require('./webpack.config.common.js');

const BUILD_PATH = path.resolve(process.env.BUILD_PATH);


const serverConfig = {
  name: 'server',
  target: 'node',
  entry: [
    path.resolve(__dirname, 'src', 'server'),
  ],
  output: {
    path: BUILD_PATH,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    rules: commonConfig.rules
  },
  resolve: commonConfig.resolve
};

module.exports = serverConfig;
