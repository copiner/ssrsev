var path = require('path')
var webpack = require('webpack')
//problem
//Babel Plugin/Preset files are not allowed to export objects, only functions.
//babel-polyfill
//Because this is a polyfill (which will run before your source code), we need it to be a dependency, not a devDependency
//npm install --save babel-polyfill
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'src', 'main')
    ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: [ 'babel-loader' ],
      exclude: /node_modules/,
      include: __dirname,
    }],
  },
}
