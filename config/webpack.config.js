const path = require('path');
const cmd=require('node-cmd');
const globImporter = require('node-sass-glob-importer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ],
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    },{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true,
          minimize: true,
          discardComments: {
            removeAll: true
          }
        }
      }, {
        loader: "sass-loader",
        options: {
          importer: globImporter()
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
      }),
    new ExtractTextPlugin({
      filename: 'style-min.css'
    })
  ],
  devServer: {
    contentBase: ['./public','./assets']
  }
}