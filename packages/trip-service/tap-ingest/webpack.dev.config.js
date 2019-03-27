const merge = require('webpack-merge');
const common = require('./webpack.cmm.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {test: /\.js$/, use: ['source-map-loader'], enforce: 'pre'} // source map for typescript
    ]

  },
  plugins: []
});