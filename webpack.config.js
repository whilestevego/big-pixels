var Webpack = require('webpack');
var Path = require('path');

/* Declare paths */
var nodeModulesPath = Path.resolve(__dirname, 'node_modules');
var buildPath = Path.resolve(__dirname, 'build');
var mainPath = Path.resolve(__dirname, 'src', 'js', 'main.js');

var config = {
  devtool: 'source-map',
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    mainPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: /src/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded&sourceComments=true'
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [ 'url?limit=8192', 'img' ]
      }, {
        test: /\.jsx?$/,
        include: /src/,
        exclude: /node_modules/,
        loaders: [ 'babel?stage=0' ]
      }
    ]
  }
};

module.exports = config;
