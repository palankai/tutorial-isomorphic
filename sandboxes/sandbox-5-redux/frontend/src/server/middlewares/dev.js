const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackconfig = require('../../../webpack.config.client.js');

const webpackcompiler = webpack(webpackconfig);

// enable webpack middleware for hot-reloads in development
function useWebpackMiddleware(app) {
  app.use(webpackDevMiddleware(webpackcompiler, {
    publicPath: webpackconfig.output.publicPath,
    stats: {
      colors: true,
      // this reduces the amount of stuff I see in my terminal; configure to your needs
      chunks: false,
      'errors-only': true
    }
  }));
  app.use(webpackHotMiddleware(webpackcompiler, {
    // eslint-disable-next-line no-console
    log: console.log
  }));

  return app;
}

module.exports = {
  useWebpackMiddleware
};
