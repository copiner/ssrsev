const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ["babel-polyfill", __dirname + "/src/index.js"],
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: "./build",
    historyApiFallback: true,
    inline: true,
    hot: true
  },
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
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              modules: true
            }
          }, {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('xjx'),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
