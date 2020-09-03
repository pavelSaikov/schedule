const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    ],
    devtool: 'source-map',
    mode,
  };
};
