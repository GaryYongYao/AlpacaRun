const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  devtool: "eval-source-map",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use:  [
          {
            loader: require.resolve('style-loader')
          },
          {
            loader: require.resolve('css-loader')
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 8080,
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets'),
          to: path.resolve(__dirname, 'build/assets')
        }
      ],
    })
  ],
};
