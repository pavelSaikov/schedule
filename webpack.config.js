const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const currentYear = new Date().getFullYear();
require('dotenv').config();
const webpack = require('webpack');

module.exports = envOptions => {
  const mode = envOptions && envOptions.production ? 'production' : 'development';

  return {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif|woff|ttf|eot|mp3)$/,
          use: ['file-loader'],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
      historyApiFallback: true,
      watchContentBase: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
      }),
      new MomentLocalesPlugin(),
      new MomentTimezoneDataPlugin({
        matchZones: [
          'Europe/London',
          'Europe/Warsaw',
          'Europe/Kiev',
          'Europe/Minsk',
          'Europe/Moscow',
          'Europe/Volgograd',
          'Asia/Yekaterinburg',
          'Asia/Tashkent',
          'Asia/Krasnoyarsk',
          'Asia/Almaty',
          'Asia/Vladivostok',
        ],
        startYear: currentYear - 10,
        endYear: currentYear + 10,
      }),
      new webpack.DefinePlugin({
        MAP_API_KEY: JSON.stringify(process.env.MAP_API_KEY),
      }),
    ],
    devtool: 'source-map',
    mode,
  };
};
