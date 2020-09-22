const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const buildFolderName = 'build';

module.exports = {
  output: {
    path: path.join(__dirname, buildFolderName),
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({test: /\.js(\?.*)?$/i})]
  },
};
