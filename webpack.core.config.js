var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var plugins = [];
var outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile += '.min.js';
} else {
  outputFile += '.js';
}

var config = {
  entry: {
    rpg_core: __dirname + '/js/core/rpg_core.js',
    rpg_events: __dirname + '/js/core/rpg_events.js',
    rpg_managers: __dirname + '/js/core/rpg_managers.js',
    rpg_scenes: __dirname + '/js/core/rpg_scenes.js',
    rpg_windows: __dirname + '/js/core/rpg_windows.js',
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/js/scripts',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins,
  node: {
    fs: 'empty'
  }
};

module.exports = config;
