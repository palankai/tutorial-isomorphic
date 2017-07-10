var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var environment = process.env.NODE_ENV || 'development';
var isProduction = environment == 'production';

var BUILD_PATH = path.resolve(process.env.BUILD_PATH);

var JS_FILENAME = '[name]-[chunkhash].bundle.js';
if (!isProduction) {
  JS_FILENAME = '[name].bundle.js';
};


const loaders = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015', 'react']
    }
  }
];

const clientConfig = {
  entry: {
    client: path.resolve(__dirname, 'src', 'client.js'),
  },
  output: {
    path: path.resolve(BUILD_PATH, 'www'),
    filename: 'build/' + JS_FILENAME
  },
  module: {
    loaders: loaders
  },
  stats: {
    colors: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
    new ManifestPlugin({
      fileName: '../manifest.json'
    })
  ]
};

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
    loaders: loaders
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
module.exports = [clientConfig, serverConfig];
