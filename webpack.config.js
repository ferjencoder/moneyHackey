//node_modules/.bin/webpack

const path = require('path');
console.log(path);

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // The entry point file described above
  //mode: 'development',
  mode: 'production',
  devtool: 'eval-source-map',
  entry: './src/index.js',
  // The location of the build folder described above
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  //mode: 'development',
  experiments: {
    topLevelAwait: true,
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
};
