import express from 'express';

function configure(app, config) {
  if( config.isProduction ) {
    app.use(express.static(config.STATIC_PATH));
  }

  if( !config.isProduction) {
    const webpackDevHelper = require('./dev.js');
    webpackDevHelper.useWebpackMiddleware(app);
  }
}


export default configure;
