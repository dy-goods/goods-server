'use strict';
const webpack = require('webpack');
const config = require('config');
const path = require('path');
const root = config.get('root'); // webpack want absolute path

const tsConfig = require(path.resolve(root, './src/client/tsconfig'));
const clientTsOptions = Object.assign({}, tsConfig);

// 如何把 webpack-dev-server 的 hot-load 通知到 node server
// http://www.boiajs.com/2015/08/25/webpack-dev-server-and-express-server
const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: clientTsOptions,
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
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
};

module.exports = webpackConfig;
