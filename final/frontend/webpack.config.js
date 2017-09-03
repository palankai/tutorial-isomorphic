const path = require('path');
const webpack = require('webpack');

const BUILD_PATH = process.env.BUILD_PATH;
const SRC_PATH = process.env.SRC_PATH;


module.exports = {
  entry: path.resolve(SRC_PATH, 'client', 'application.jsx'),
  output: {
    path: path.resolve(BUILD_PATH, 'build'),
    filename: 'application.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    colors: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(SRC_PATH, 'client'),
      'node_modules'
    ]
  },
  devtool: 'source-map'
};
