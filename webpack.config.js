//const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './onboarding/src/index.js',
  devtool: 'source-map',
  //output: {
  //  path: path.join(__dirname, '/onboarding/static/js'),
  //  filename: 'main.js'
  //},
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.(svg|png|jp(e)?g)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: require.resolve('url-loader'),
          options: {
            name: '[name].[ext]',
            outputPath: 'icons/'
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Load a custom template (lodash by default)
      template: './templates/react/index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
  })
  ],
  stats: {
    children: false
  }
};

