//const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //entry: './onboarding/src/index.js',
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Load a custom template (lodash by default)
      template: './templates/react/index.html'
    })
  ],
  stats: {
    children: false
  }
};

