const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: `./src/main.ts`,
  cache: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      'zlib': false,
      'https': false,
      'http': false,
      'stream': false,
      'crypto': false,
      'os': false,
      'magic-sdk': false
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/builds'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
