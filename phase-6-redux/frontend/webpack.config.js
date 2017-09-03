const path = require('path');

const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');


const BUILD_PATH = process.env.BUILD_PATH;
const SRC_PATH = process.env.SRC_PATH;
const isProduction = process.env.NODE_ENV === 'production';

let JS_FILENAME = '[name]-[chunkhash].bundle.js';

const entry = [
  path.resolve(SRC_PATH, 'client', 'application.jsx'),
];

const plugins = [
  new ManifestPlugin({
    fileName: 'manifest.json'
  })
];

if (!isProduction) {
  JS_FILENAME = '[name].bundle.js';
  entry.push('webpack-hot-middleware/client');
  entry.push('webpack/hot/dev-server');
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}


module.exports = {
  entry,
  output: {
    path: path.resolve(BUILD_PATH, 'build'),
    filename: JS_FILENAME
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
  plugins,
  devtool: 'source-map'
};
