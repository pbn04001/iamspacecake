const path = require('path');
const cmd=require('node-cmd');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ],
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    },{
      test: /\.jsx$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    },{
      test: /\.css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }]
    }]
  },
  plugins: [HtmlWebpackPluginConfig],
  devServer: {
    contentBase: './src',
    watchContentBase: true,
    before(){
      console.log("Compiling css");
      cmd.run('yarn run compile-css');
    }
  }
}