const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const project = require('./project.config')

const extractPlugin = new ExtractTextPlugin({
  filename: './styles.min.css',
})

common.module.rules.push({
  test: /\.scss$/,
  use: extractPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: false,
          sourceMap: true,
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
})

common.plugins.push(new HtmlWebpackPlugin({
  template: project.paths.client('index.test.html'),
  hash: false,
  favicon: project.paths.public('favicon.new.ico'),
  filename: 'index.html',
  inject: 'body',
}))

common.plugins.push(extractPlugin)

module.exports = merge(common, {
  devtool: 'inline-source-map',
})
