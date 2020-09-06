const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {
  const common = {
    mode: process.env.NODE_ENV,
    entry: {
      index: './src/index.tsx'
    },
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
            loader: 'babel-loader?optional[]=runtime' // runtime to separate to external functions and reduce amount of code
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader', // need for autoprefixer
            'sass-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'url-loader',
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ],
        },
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(), // deprecate compilation if error occure
      new HtmlWebpackPlugin({
        chunks: ['index'],
        template: './index.html'
      }),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    }
  };

  const restConfig = process.env.NODE_ENV === 'development' ?
  require('./webpack.config.dev') : require('./webpack.config.prod');

  return merge(common, restConfig);
}