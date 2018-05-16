'use strict';
const webpack = require('webpack');
const config = require('config');
const path = require('path');
const root = config.get('root'); // webpack want absolute path

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve(root, './src/client/tsconfig.json'),
          },
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?minimize', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'statics/imgs/[name].[hash:7].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'statics/fonts/[name].[hash:7].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.css']
  },
};

module.exports = webpackConfig;
