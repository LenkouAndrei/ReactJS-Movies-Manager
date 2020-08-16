const { merge } = require('webpack-merge');

module.exports = () => {
  const common = {
    mode: process.env.NODE_ENV,
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
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
            'css-loader',
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
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
  };

  const restConfig = process.env.NODE_ENV === 'development' ?
  require('./webpack.config.dev') : require('./webpack.config.prod');

  return merge(common, restConfig);
}