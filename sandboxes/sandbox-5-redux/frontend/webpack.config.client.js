/* includes */
const path = require('path');

const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./webpack.config.common.js');

/* environment */
const environment = process.env.NODE_ENV || 'development';
const isProduction = environment === 'production';
const BUILD_PATH = path.resolve(process.env.BUILD_PATH);

let JS_FILENAME = '[name]-[chunkhash].bundle.js';
let CSS_FILENAME = '[name]-[hash].bundle.min.css';
let ASSET_FILENAME = 'assets/[name]-[hash].[ext]';

if (!isProduction) {
  JS_FILENAME = '[name].bundle.js';
  CSS_FILENAME = '[name].bundle.css';
  ASSET_FILENAME = 'assets/[name].[ext]';
}

const clientEntry = [
  path.resolve(__dirname, 'src', 'client')
];
const plugins = [
  new ManifestPlugin({
    fileName: '../manifest.json'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module) {
      // This prevents stylesheet resources with the .css or .scss extension
      // from being moved from their original chunk to the vendor chunk
      if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
        return false;
      }
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  })
];

if (!isProduction) {
  clientEntry.push('webpack-hot-middleware/client');
  clientEntry.push('webpack/hot/dev-server');
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}


const clientConfig = {
  entry: {
    client: clientEntry
  },
  output: {
    path: path.resolve(BUILD_PATH, 'www'),
    filename: `build/${JS_FILENAME}`,
    publicPath: '/'
  },
  module: {
    rules: commonConfig.rules.concat([
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `build/${ASSET_FILENAME}`
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
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
              loader: 'sass-loader',
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
    new ExtractTextPlugin(`build/${CSS_FILENAME}`),
    new CopyWebpackPlugin([
      { from: 'public/', to: `${BUILD_PATH}/www` }
    ])
  ])
};

module.exports = clientConfig;
