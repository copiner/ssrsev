const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: ["babel-polyfill", __dirname + "/src/index.js"],
  output: {
    path: __dirname + "/build",
    filename: "bundle-[hash].js"
  },
  devtool: "null",
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              loader: "css-loader",
              options: {
                  modules: true
              }
          }, {
              loader: "postcss-loader"
          }],
      })
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('xjx'),
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),//OccurenceOrderPlugin 内置
    new webpack.optimize.UglifyJsPlugin(), //UglifyJsPlugin 内置
    new ExtractTextPlugin({//npm install --save-dev extract-text-webpack-plugin
        filename: "bundle-[hash].css",
        disable: false,
        allChunks: true
    })
  ]
}

//You are currently using minified code outside of NODE_ENV === 'production'.
// This means that you are running a slower development build of Redux.
// You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack
//  (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build.
