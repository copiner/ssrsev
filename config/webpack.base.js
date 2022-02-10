const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolvePath } = require('./util');

module.exports = {
    entry: resolvePath('../src/index.js'),
    module: {
        rules: [
            {
              test: /(\.jsx|\.js)$/,
              exclude: /node_modules/,
              use: 'babel-loader'
            },
            {
              test: /\.css$/,
              use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
              ]
            },
            {
              test: /\.(png|jpg)$/,
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
        new Webpack.DefinePlugin({
          '__isServer': false
        }),
        new CleanWebpackPlugin()
        ]
    }
