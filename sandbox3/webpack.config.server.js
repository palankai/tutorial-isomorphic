var path = require('path');
var webpack = require('webpack');
var client_config = require('./webpack.config.js');

const BUILD_PATH = path.resolve(process.env.BUILD_PATH);
const rules = client_config.rules;
const resolve = client_config.resolve;


const serverConfig = {
  name: 'server',
  target: 'node',
  entry: path.resolve(__dirname, 'src', 'server.js'),
  output: {
    path: BUILD_PATH,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    rules: rules
  },
  resolve: resolve
};

module.exports = serverConfig;
