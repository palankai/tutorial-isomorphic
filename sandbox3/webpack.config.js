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
    exclude: /node_modules/,
    loaders: [
      'react-hot-loader',
      'babel-loader?presets[]=react,presets[]=es2015',
    ]
  }
];

const resolve = {
  extensions: ['.js', '.jsx']
};

const clientConfig = {
  entry: {
    client: [
      path.resolve(__dirname, 'src', 'client.js'),
      'webpack-hot-middleware/client', 'webpack/hot/dev-server'
    ]
  },
  output: {
    path: path.resolve(BUILD_PATH, 'www'),
    filename: 'build/' + JS_FILENAME,
    publicPath: '/'
  },
  module: {
    loaders: loaders
  },
  stats: {
    colors: true
  },
  resolve: resolve,
  devtool: 'source-map',
  plugins: [
    new ManifestPlugin({
      fileName: '../manifest.json'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = {
  default: clientConfig,
  loaders: loaders,
  resolve: resolve
};
