const path = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    filename: 'main.[hash].js',
    chunkFilename: '[id].[hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true,
  },
  watch: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};