require('babel-polyfill')
const path = require('path')
const globImporter = require('node-sass-glob-importer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const project = require('./project.config')

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [
        project.paths.client(),
        /whatwg-fetch/, // needed to transform-runtime polyfill's use of Promise
      ],
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      exclude: /src\/static/,
      use: [{
        loader: 'eslint-loader',
        options: {
          configFile: project.paths.base('.eslintrc'),
          emitWarning: true,
        },
      }],
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          minimize: true,
          discardComments: {
            removeAll: true,
          },
        },
      }, {
        loader: 'sass-loader',
        options: {
          importer: globImporter(),
        },
      }],
    },
    // Modernizr
    {
      test: /\.modernizrrc$/,
      use: 'webpack-modernizr-loader?useConfigFile',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: project.paths.client('index.html'),
      hash: false,
      favicon: project.paths.public('favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new ExtractTextPlugin({
      filename: 'style-min.css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REST_ENDPOINT: JSON.stringify(project.rest_context_path),
        NODE_ENV: JSON.stringify(project.env.NODE_ENV),
      },
    }),
  ],
  devServer: {
    contentBase: ['./public', './assets'],
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      project.paths.client(),
      'node_modules',
    ],
    alias: {
      modernizr$: project.paths.base('.modernizrrc'),
    },
  },
}
