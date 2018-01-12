const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const entry = {
  background: './src/events/background.js',
  popup: './src/popup/popup.js',
};

const buildPlugin = () => {
  return process.env.NODE_ENV === 'production' ?
    [new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new BundleAnalyzerPlugin()] : [];
};

const config = {
  context: __dirname,
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    },
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)(?:\?.*|)$/i,
        use: 'file-loader'
      }
    ],
  },
  plugins: [
    ...buildPlugin()
  ],
};

module.exports = config;
