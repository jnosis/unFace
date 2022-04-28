const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.join(__dirname, '../', 'src');

module.exports = {
  entry: path.join(srcDir, 'index.tsx'),
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcDir, '..', 'public', 'index.html'),
      favicon: path.join(srcDir, '..', 'public', 'favicon.ico'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
