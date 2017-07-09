var path = require('path');
var webpack = require('webpack');

var BUILD_PATH = path.resolve('/var/www');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'client.js'),
    output: {
        path: BUILD_PATH,
        filename: 'build/client.bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: 'source-map'
};
