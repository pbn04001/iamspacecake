const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
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
          minimized: true,
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
    fallback: 'style-loader',
  }),
})

common.plugins.push(new HtmlWebpackPlugin({
  template: project.paths.client('index.html'),
  hash: false,
  favicon: project.paths.public('favicon.new.ico'),
  filename: 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true,
  },
}))

common.plugins.push(extractPlugin)

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      comments: false,
    }),
  ],
});
