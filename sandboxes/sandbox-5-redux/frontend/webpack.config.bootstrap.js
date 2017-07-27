const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { consts } = require('./webpack.config.common.js');


function configure(env, webpack) {
  const isProduction = webpack.p;

  const NAME = consts.isProduction ? '[name]-[chunkhash]' : '[name]';

  const CSS_FILENAME = `build/bootstrap/${NAME}.css`;
  const ASSET_FILENAME = `build/bootstrap/assets/${NAME}.[ext]`;

  return {
    target: 'web',
    entry: {
      'bootstrap': './src/bootstrap/bootstrap.scss'
    },
    output: {
      path: path.resolve(consts.BUILD_PATH, 'www'),
      filename: CSS_FILENAME
    },
    module: {
      rules: [
        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: ASSET_FILENAME
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
      ]
    },
    plugins: [
      new ExtractTextPlugin(CSS_FILENAME) // css file will override generated js file
    ]
  };
}

module.exports = configure;
