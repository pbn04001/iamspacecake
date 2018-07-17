const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.common.js')

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

common.plugins.push(extractPlugin)

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: ['./public', './assets'],
    historyApiFallback: true,
  },
})
