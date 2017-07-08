var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/client.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'client.bundle.js'
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
    devtool: 'source-map'
};
