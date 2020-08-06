const { merge } = require('webpack-merge');

module.exports = () => {
  const common = {
    mode: process.env.NODE_ENV,
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {name: 'img/[name].[ext]'}
            },
            'image-webpack-loader'
          ]
        }
      ]
    }
  };

  const restConfig = process.env.NODE_ENV === 'development' ?
  require('./webpack.config.dev') : require('./webpack.config.prod');

  return merge(common, restConfig);
}