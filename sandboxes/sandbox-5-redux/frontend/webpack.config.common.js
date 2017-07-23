const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader']
  }
];

const resolve = {
  extensions: ['.js', '.jsx']
};

module.exports = {
  rules,
  resolve
};
