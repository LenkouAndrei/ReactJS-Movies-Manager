const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const buildFolderName = 'build';

module.exports = {
  output: {
    path: path.join(__dirname, buildFolderName),
    filename: 'main.[hash].js',
    chunkFilename: '[id].[hash].js',
  },
  devServer: {
    contentBase: path.join(__dirname, buildFolderName),
    contentBase: path.join(__dirname, buildFolderName),
    compress: true,
    port: 8000,
    watchContentBase: true,
    progress: true
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({test: /\.js(\?.*)?$/i})]
  },
};