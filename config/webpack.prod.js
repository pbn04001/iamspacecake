const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

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
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      comments: false,
    }),
  ],
});
