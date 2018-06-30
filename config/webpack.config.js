const path = require('path');
const globImporter = require('node-sass-glob-importer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project.config')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  devtool: project.devtool,
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc        : false,
          cacheDirectory : true,
          plugins        : ['transform-runtime'],
          presets        : [['es2015', {'modules': false}], 'react', 'stage-0']
        },
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
      template: project.paths.client('index.html'),
      hash: false,
      favicon  : project.paths.public('favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      excludeChunks : ['tests'],
      minify   : {
        collapseWhitespace : true
      }
    }),
    new ExtractTextPlugin({
      filename: 'style-min.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REST_ENDPOINT: JSON.stringify(project.rest_context_path)
      }
    })
  ],
  devServer: {
    contentBase: ['./public','./assets']
  },
  resolve : {
    extensions : ['.js', '.jsx', '.json'],
    modules : [
      project.paths.client(),
      'node_modules'
    ]
  }
}
