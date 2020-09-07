const path = require('path');
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
    compress: true,
    port: 8000,
    watchContentBase: true,
    progress: true
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({test: /\.js(\?.*)?$/i})]
  },
};