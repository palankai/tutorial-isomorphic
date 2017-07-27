const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const consts = {
  isProduction,
  BUILD_PATH: path.resolve(process.env.BUILD_PATH)
};

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  }
];

const resolve = {
  extensions: ['.js', '.jsx'],
  modules: [
    path.resolve(__dirname, 'src'),
    'node_modules'
  ]
};

module.exports = {
  rules,
  resolve,
  consts
};
