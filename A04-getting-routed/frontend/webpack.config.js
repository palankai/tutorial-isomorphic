var path = require('path');
var webpack = require('webpack');

module.exports = {
    // Replace the entry
    entry: path.resolve(__dirname, 'src', 'client.jsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        // Specify new output filename
        filename: 'client.bundle.js'
    },
    module: {
        loaders: [
            {
                // New regular expression recognise both js and jsx
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
