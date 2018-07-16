require('babel-polyfill')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')
const project = require('./project.config')

const extractPlugin = new ExtractTextPlugin({
  filename: './styles.min.css',
});

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
      test: /\.modernizrrc$/,
      use: 'webpack-modernizr-loader?useConfigFile',
    }, {
      test: /\.scss$/,
      use: extractPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        fallback: 'style-loader',
      }),
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
    extractPlugin,
    new webpack.DefinePlugin({
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
