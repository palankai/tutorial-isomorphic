const path = require('path');

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader']
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
  resolve
};
