require('babel-polyfill')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
      ],
      use: {
        loader: 'babel-loader',
      },
    }, {
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
    new webpack.DefinePlugin({
      __DEBUG__: JSON.stringify(project.__DEBUG__),
      'process.env': {
        REST_ENDPOINT: JSON.stringify(project.rest_context_path),
        NODE_ENDPOINT: JSON.stringify(project.node_context_path),
        NODE_ENV: JSON.stringify(project.env),
        PAY_PAL_ENVIRONMENT: JSON.stringify(project.pay_pal_environment),
      },
    }),
    new CleanWebpackPlugin(['dist']),
  ],
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
