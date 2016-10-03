import webpack from 'webpack';
import path from 'path';
import { argv } from 'yargs';

const { mode } = argv;

const { UglifyJsPlugin } = webpack.optimize;

const libraryName = 'factions';

const banner = `
   @plugindesc
   @author Ian Delairre

   @help Add premade factions to your game.

   @param Factions
   @desc name of factions json file in data folder
   @default Factions.json
`;

const plugins = [
  new webpack.BannerPlugin(banner, {
    entryOnly: true
  })
];

let outputFile;

if (mode.env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true, comments: false }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: {
    factions: `${__dirname}/js/src/factions.js`,
    test: `${__dirname}/js/src/test.js`
  },
  devtool: 'source-map',
  output: {
    path: `${__dirname}/js/plugins`,
    filename: '[name].js',
    library: libraryName
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
