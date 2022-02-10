const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const { resolvePath } = require('./util');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: resolvePath('../server/index.js'),
  output: {
    filename: 'index.js',
    path: resolvePath('../dist/server')
  },
  externals: [nodeExternals()],
  module: {
    rules: [
        {
          test: /.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['css-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/resource',
          parser: {
             dataUrlCondition: {
               maxSize: 4 * 1024 // 4kb
             }
           },
          generator: {
             filename: 'imgs/[hash][ext][query]'
          }
        },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__isServer': true,
      '__isDev': isDev
    }),
    new CleanWebpackPlugin()
  ]
};
