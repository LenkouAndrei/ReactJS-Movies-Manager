const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const buildFolderName = 'build';

module.exports = {
  output: {
    path: path.join(__dirname, buildFolderName, 'main.js'),
  },
  devServer: {
    contentBase: path.join(__dirname, buildFolderName),
    compress: true,
    port: 8000,
    watchContentBase: true,
    progress: true
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};