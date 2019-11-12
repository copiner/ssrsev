const webpack = require('webpack');
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'development'

console.log(process.env.NODE_ENV);
console.log(process.NODE_ENV);

console.log(isProd);

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: {
     app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    chunkFilename: 'vendor.js',
    publicPath:'/'
  },
  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[path][name].[ext]'
                  }
                },
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192
                  }
                }
              ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    'css-loader',
                    'sass-loader'
                   ]
            }
        ]
    },
    plugins: [
          new webpack.DefinePlugin({
             PRODUCTION: JSON.stringify(true),
             VERSION: JSON.stringify('5fa3b9'),
             TWO: '1+1',
             'typeof window': JSON.stringify('object'),
             'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          }),
         new HtmlWebpackPlugin({ // 打包输出HTML
            title: 'Hello World',
            filename: 'index.html'
         }),
         new CleanWebpackPlugin(),
         new webpack.HotModuleReplacementPlugin()
     ],
     optimization: {
        splitChunks: {
          chunks: "all",// all async initial
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: "~",
          name: true,
          cacheGroups: {
              vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10
              },
              default: {
                  minChunks: 2,
                  priority: -20,
                  reuseExistingChunk: true
              }
          }
       }
    },
   devServer: {
      contentBase: path.resolve(__dirname, "build"),
      historyApiFallback: true,
      host:"localhost",
      port: 9000,
      inline: true,
      hot: true,
      // proxy: {
      //    '/api': {
      //      target: 'http://192.168.23.213:8080',
      //      pathRewrite: {'^/api' : ''}
      //    }
      //  }
    }
}
