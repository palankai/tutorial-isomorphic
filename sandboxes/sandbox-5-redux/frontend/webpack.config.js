/* includes */
var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

/* environment */
var environment = process.env.NODE_ENV || 'development';
var isProduction = environment == 'production';
var BUILD_PATH = path.resolve(process.env.BUILD_PATH);

var JS_FILENAME = '[name]-[chunkhash].bundle.js';
const presets = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc'), 'utf8'));

var jsx_loaders = [{loader: 'babel-loader', options: presets}];
var client_entry = path.resolve(__dirname, 'src', 'client.js');
var plugins = [
    new ManifestPlugin({
      fileName: '../manifest.json'
    }),

];

if (!isProduction) {
  JS_FILENAME = '[name].bundle.js';
  jsx_loaders.unshift({loader: 'react-hot-loader'});
  client_entry = [
    client_entry,
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server'
  ];
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
};

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: jsx_loaders
  }
];

const resolve = {
  extensions: ['.js', '.jsx']
};

const clientConfig = {
  entry: {
    client: client_entry
  },
  output: {
    path: path.resolve(BUILD_PATH, 'www'),
    filename: 'build/' + JS_FILENAME,
    publicPath: '/'
  },
  module: {
    rules: rules
  },
  stats: {
    colors: true
  },
  resolve: resolve,
  devtool: 'source-map',
  plugins: plugins
};

module.exports = {
  default: clientConfig,
  rules: rules,
  resolve: resolve
};
