'use strict';
const webpack = require('webpack');
const config = require('config');
const path = require('path');
const root = config.get('root'); // webpack want absolute path
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(root, './statics'),
    publicPath: `${config.get('onlineHost')}/@/statics/`,
  },
  entry: {
    app: [path.resolve(root, './src/client/main.tsx')],
  },
  plugins: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true, // set to true if you want JS source maps
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});

module.exports = webpackConfig;
