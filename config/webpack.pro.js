const webpack = require('webpack');
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin').CleanWebpackPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

console.log(process.NODE_ENV);

module.exports = {
  mode: "production",
  entry: {
     app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle-[hash].js',
    chunkFilename: 'vendor-[hash].js',
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

                  // Creates `style` nodes from JS strings
                  'style-loader',

                  MiniCssExtractPlugin.loader,

                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ]
            }
        ]
    },
    plugins: [
         new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            ENV: JSON.stringify(process.env.NODE_ENV)
         }),
         new HtmlWebpackPlugin({ // 打包输出HTML
            title: 'Hello World',
            filename: 'index.html'
         }),
         new CleanWebpackPlugin(),
         new CompressionPlugin(),
         new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'index-[hash].css',
            chunkFilename: 'index-[id].css',

            ignoreOrder: false, // Enable to remove warnings about conflicting order
          })
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
                   //test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                   priority: -10
                   //filename: 'vendors.js'
               },
               default: {
                   minChunks: 2,
                   priority: -20,
                   reuseExistingChunk: true
                   //filename: 'common.js'
               }
           }
       }
    }
}
//
// if (!isProd) {
//   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//   webpackConfig.plugins.push(new BundleAnalyzerPlugin());
// }



//module.exports = webpackConfig;
