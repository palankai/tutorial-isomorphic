/* includes */
var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var commonConfig = require('./webpack.config.common.js');

/* environment */
var environment = process.env.NODE_ENV || 'development';
var isProduction = environment == 'production';
var BUILD_PATH = path.resolve(process.env.BUILD_PATH);

var JS_FILENAME = '[name]-[chunkhash].bundle.js';
var CSS_FILENAME = '[name]-[hash].bundle.min.css';
var ASSET_FILENAME = 'assets/[name]-[hash].[ext]';

const presets = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc'), 'utf8'));
if (!isProduction) {
  JS_FILENAME = '[name].bundle.js';
  CSS_FILENAME = '[name].bundle.css';
  ASSET_FILENAME = 'assets/[name].[ext]';
};

var jsx_loaders = ["babel-loader"];
var client_entry = [
  path.resolve(__dirname, 'src', 'client')
];
var plugins = [
  new ManifestPlugin({
    fileName: '../manifest.json'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: function (module) {
      // This prevents stylesheet resources with the .css or .scss extension
      // from being moved from their original chunk to the vendor chunk
      if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
        return false;
      }
      return module.context && module.context.indexOf("node_modules") !== -1;
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "manifest",
    minChunks: Infinity
  })
];

if (!isProduction) {
  jsx_loaders.unshift({loader: 'react-hot-loader'});
  client_entry.push('webpack-hot-middleware/client');
  client_entry.push('webpack/hot/dev-server');
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
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
    rules: commonConfig.rules.concat([
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "build/" + ASSET_FILENAME
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ])
  },
  stats: {
    colors: true
  },
  resolve: commonConfig.resolve,
  devtool: 'source-map',
  plugins: plugins.concat([
    new ExtractTextPlugin('build/' + CSS_FILENAME)
  ])
};

module.exports = clientConfig;
