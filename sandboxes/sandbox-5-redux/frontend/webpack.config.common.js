const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ["babel-loader"]
  }
];

const resolve = {
  extensions: ['.js', '.jsx']
};

module.exports = {
  rules,
  resolve
};
