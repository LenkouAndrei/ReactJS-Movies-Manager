const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    contentBasePublicPath: '/',
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