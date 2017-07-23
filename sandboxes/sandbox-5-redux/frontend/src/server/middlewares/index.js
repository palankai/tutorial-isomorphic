import express from 'express';

const webpackDevHelper = require('./dev.js');

function configure(app, config) {
  if (config.isProduction) {
    app.use(express.static(config.STATIC_PATH));
  }

  if (!config.isProduction) {
    webpackDevHelper.useWebpackMiddleware(app);
  }
}


export default configure;
