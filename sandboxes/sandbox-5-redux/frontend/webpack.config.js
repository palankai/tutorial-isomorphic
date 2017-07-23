var webpack = require('webpack');
var clientConfig = require('./webpack.config.client.js');
var serverConfig = require('./webpack.config.server.js');

module.exports = [clientConfig, serverConfig];
