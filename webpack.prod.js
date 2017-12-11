const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    module: {
        loaders: [{
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-1']
          }
        }]
      },
    plugins: [
        new UglifyJSPlugin()
    ]
});